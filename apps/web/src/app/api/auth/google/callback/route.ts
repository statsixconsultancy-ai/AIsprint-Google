import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { generateSessionToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const code = searchParams.get('code')
  const error = searchParams.get('error')

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const REDIRECT_URI = `${baseUrl}/api/auth/google/callback`

  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

  // ❌ If user denied access
  if (error) {
    return NextResponse.redirect(`${baseUrl}/signin?error=google_denied`)
  }

  // ❌ No code received
  if (!code) {
    return NextResponse.redirect(`${baseUrl}/signin?error=no_code`)
  }

  try {
    // 🔁 Step 1: Exchange code for token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    })

    const tokenData = await tokenRes.json()

    if (!tokenRes.ok) {
      console.error('Token error:', tokenData)
      return NextResponse.redirect(`${baseUrl}/signin?error=token_failed`)
    }

    // 👤 Step 2: Get user info
    const userRes = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    )

    const googleUser = await userRes.json()

    if (!userRes.ok) {
      console.error('User info error:', googleUser)
      return NextResponse.redirect(`${baseUrl}/signin?error=user_failed`)
    }

    // 🧠 Step 3: Find or create user
    let users = await query(
      'SELECT id, name, email, username, profile_image_url FROM public.users WHERE email = $1',
      [googleUser.email]
    )

    let user

    if (users.length === 0) {
      const username =
        googleUser.email.split('@')[0] +
        '_' +
        Math.random().toString(36).slice(2, 6)

      const newUsers = await query(
        `INSERT INTO public.users (name, email, username, profile_image_url, oauth_provider, oauth_provider_id)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, name, email, username, profile_image_url`,
        [
          googleUser.name,
          googleUser.email,
          username,
          googleUser.picture || null,
          'google',
          googleUser.id,
        ]
      )

      user = newUsers[0]
    } else {
      user = users[0]
    }

    // 🔐 Step 4: Create session
    const sessionToken = generateSessionToken()
    const cookieStore = await cookies()

    cookieStore.set('auth_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })

    cookieStore.set('user_id', String(user.id), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })

    // ✅ Step 5: Redirect to dashboard
    return NextResponse.redirect(`${baseUrl}/dashboard`)
  } catch (err) {
    console.error('Google OAuth error:', err)
    return NextResponse.redirect(`${baseUrl}/signin?error=google_failed`)
  }
}
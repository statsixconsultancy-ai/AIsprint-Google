import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { generateSessionToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import * as jose from 'jose'

// ➕ Apple OAuth configuration
// Add these to your .env.local:
// APPLE_CLIENT_ID=your-apple-service-id (e.g., com.aisprint.web)
// APPLE_TEAM_ID=your-apple-team-id
// APPLE_KEY_ID=your-apple-key-id
// APPLE_PRIVATE_KEY=your-apple-private-key (base64 encoded .p8 file content)

const APPLE_CLIENT_ID = process.env.APPLE_CLIENT_ID!
const APPLE_TEAM_ID = process.env.APPLE_TEAM_ID!
const APPLE_KEY_ID = process.env.APPLE_KEY_ID!
const APPLE_PRIVATE_KEY = process.env.APPLE_PRIVATE_KEY!
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/apple`

/**
 * Generate Apple client_secret JWT
 * Apple requires a signed JWT instead of a static secret
 */
async function generateAppleClientSecret(): Promise<string> {
  const privateKey = await jose.importPKCS8(
    Buffer.from(APPLE_PRIVATE_KEY, 'base64').toString('utf-8'),
    'ES256'
  )

  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({ alg: 'ES256', kid: APPLE_KEY_ID })
    .setIssuer(APPLE_TEAM_ID)
    .setIssuedAt()
    .setExpirationTime('5m')
    .setAudience('https://appleid.apple.com')
    .setSubject(APPLE_CLIENT_ID)
    .sign(privateKey)

  return jwt
}

/**
 * GET /api/auth/apple
 * Redirect user to Apple consent screen
 */
export async function GET(request: NextRequest) {
  const appleAuthUrl = new URL('https://appleid.apple.com/auth/authorize')
  appleAuthUrl.searchParams.set('client_id', APPLE_CLIENT_ID)
  appleAuthUrl.searchParams.set('redirect_uri', REDIRECT_URI)
  appleAuthUrl.searchParams.set('response_type', 'code')
  appleAuthUrl.searchParams.set('scope', 'name email')
  appleAuthUrl.searchParams.set('response_mode', 'form_post') // Apple uses POST callback

  return NextResponse.redirect(appleAuthUrl.toString())
}

/**
 * POST /api/auth/apple
 * Apple sends the callback as a POST (form_post response mode)
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const code = formData.get('code') as string | null
    const userDataStr = formData.get('user') as string | null // Apple sends user info only on FIRST login
    const error = formData.get('error') as string | null

    if (error || !code) {
      console.error('Apple OAuth error:', error)
      return NextResponse.redirect(
        new URL('/auth/signin?error=apple_denied', request.url)
      )
    }

    // ── Exchange code for tokens ──
    const clientSecret = await generateAppleClientSecret()

    const tokenRes = await fetch('https://appleid.apple.com/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: APPLE_CLIENT_ID,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      }),
    })

    if (!tokenRes.ok) {
      console.error('Apple token exchange failed:', await tokenRes.text())
      return NextResponse.redirect(
        new URL('/auth/signin?error=apple_token_failed', request.url)
      )
    }

    const tokenData = await tokenRes.json()

    // ── Decode the id_token to get user email ──
    const claims = jose.decodeJwt(tokenData.id_token)
    const appleEmail = claims.email as string
    const appleUserId = claims.sub as string

    // ── Parse user data (only available on first sign-in) ──
    let appleName = 'Apple User'
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr)
        if (userData.name) {
          appleName = [userData.name.firstName, userData.name.lastName]
            .filter(Boolean)
            .join(' ')
        }
      } catch {
        // user data parsing failed, use default name
      }
    }

    // ── Find or create user ──
    let users = await query(
      'SELECT id, name, email, username, profile_image_url, dob FROM public.users WHERE email = $1',
      [appleEmail]
    )

    let user

    if (users.length === 0) {
      const username = appleEmail.split('@')[0] + '_' + Math.random().toString(36).slice(2, 6)

      const newUsers = await query(
        `INSERT INTO public.users (name, email, username, oauth_provider, oauth_provider_id)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, name, email, username, profile_image_url, dob`,
        [appleName, appleEmail, username, 'apple', appleUserId]
      )
      user = newUsers[0]
    } else {
      user = users[0]
    }

    // ── Create session (same as your signin route) ──
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

    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (error) {
    console.error('Apple OAuth error:', error)
    return NextResponse.redirect(
      new URL('/auth/signin?error=apple_failed', request.url)
    )
  }
}
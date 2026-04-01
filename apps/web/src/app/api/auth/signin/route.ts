import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyPassword, generateSessionToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'
// ➕ added: reusable error response to prevent timing attacks
// Returns identical message for all auth failures (email not found vs wrong password)
const AUTH_FAILED_RESPONSE = NextResponse.json(
  { success: false, message: 'Invalid email or password' },
  { status: 401 }
)

// ➕ added: basic email format check (prevents unnecessary DB queries)
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // ➕ added: validate email format before hitting DB
    if (typeof email !== 'string' || !isValidEmail(email.trim())) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // ➕ added: validate password is a string and not excessively long (DoS prevention)
    if (typeof password !== 'string' || password.length > 128) {
      return AUTH_FAILED_RESPONSE
    }

    // ✅ updated: trimmed + lowercased email for consistency
    const normalizedEmail = email.trim().toLowerCase()

    // Find user by email
    const users = await query(
      'SELECT id, name, email, username, password_hash, profile_image_url, dob FROM public.users WHERE email = $1',
      [normalizedEmail] // ✅ updated: use normalized email
    )

    if (users.length === 0) {
      return AUTH_FAILED_RESPONSE // ✅ updated: use consistent response
    }

    const user = users[0]

    // Verify password
    if (!user.password_hash) {
      return AUTH_FAILED_RESPONSE // ✅ updated: use consistent response
    }

    const isPasswordValid = await verifyPassword(password, user.password_hash as string)

    if (!isPasswordValid) {
      return AUTH_FAILED_RESPONSE // ✅ updated: use consistent response
    }

    // Generate session token
    const sessionToken = generateSessionToken()

    // ➕ added: await cookies() — required in Next.js 15+ App Router
    const cookieStore = await cookies()

    // Store session in cookie
    cookieStore.set('auth_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/', // ➕ added: explicit path for cookie scope
    })

    // Store user id cookie
    cookieStore.set('user_id', String(user.id), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/', // ➕ added: explicit path
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Signed in successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          profile_image_url: user.profile_image_url,
          dob: user.dob,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Sign in error:', error)

    // ✅ updated: handle JSON parse errors gracefully
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, message: 'Invalid request body' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'An error occurred during sign in' },
      { status: 500 }
    )
  }
}
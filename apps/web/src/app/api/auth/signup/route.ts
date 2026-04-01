import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import {
  hashPassword,
  isValidEmail,
  isValidPassword,
} from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    let { username, email, password, name } = body

    // ✅ Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // ✅ Normalize email
    email = String(email).trim().toLowerCase()

    // ✅ Validate email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      )
    }

    // ✅ Validate password
    if (!isValidPassword(password)) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Password must be at least 8 characters with uppercase, lowercase, and numbers',
        },
        { status: 400 }
      )
    }

    // ✅ Ensure name (DB requires NOT NULL)
    if (!name) {
      name = email.split('@')[0] || 'User'
    }

    // ✅ Check email already exists
    const existingEmail = await query(
      'SELECT id FROM public.users WHERE email = $1 LIMIT 1',
      [email]
    )

    if (existingEmail.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      )
    }

    // ✅ Generate username
    if (!username) {
      const base = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '')
      const random = Math.floor(1000 + Math.random() * 9000)
      username = `${base}${random}`
    }

    username = username.toLowerCase()

    // ✅ Ensure username is unique
    let finalUsername = username
    let isUnique = false

    for (let i = 0; i < 5; i++) {
      const existing = await query(
        'SELECT id FROM public.users WHERE username = $1 LIMIT 1',
        [finalUsername]
      )

      if (existing.length === 0) {
        isUnique = true
        break
      }

      finalUsername = `${username}${Math.floor(Math.random() * 1000)}`
    }

    if (!isUnique) {
      return NextResponse.json(
        { success: false, message: 'Username generation failed' },
        { status: 500 }
      )
    }

    // ✅ Hash password
    const passwordHash = await hashPassword(password)

    // ✅ Insert user
    const result = await query<{ id: string; email: string; username: string; name: string }>(
      `INSERT INTO public.users
        (name, username, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, username, name`,
      [name, finalUsername, email, passwordHash]
    )

    const user = result[0]

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User creation failed' },
        { status: 500 }
      )
    }

    // ✅ Send email safely (non-blocking)
    async function sendEmailSafe() {
      try {
        const { sendSignupConfirmation } = await import('@/lib/email.service')

        await sendSignupConfirmation({
          name: user.name,
          email: user.email,
        })
      } catch (err) {
        console.error('⚠️ Email skipped:', err)
      }
    }

    sendEmailSafe()

    // ✅ Success response
    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)

    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
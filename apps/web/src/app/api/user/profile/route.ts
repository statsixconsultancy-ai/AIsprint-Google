import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'
/* ───────────── GET USER ───────────── */
export async function GET() {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    const result = await query(
      `SELECT id, name, email, username, country, bio, phone, dob, profile_image_url
       FROM public.users
       WHERE id = $1`,
      [userId]
    )

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, user: result[0] },
      { status: 200 }
    )
  } catch (error) {
    console.error('GET profile error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}

/* ───────────── UPDATE USER ───────────── */
export async function PUT(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, email, country, bio, phone, dob, profile_image_url } = body

    const result = await query(
      `UPDATE public.users 
       SET name = COALESCE($1, name),
           email = COALESCE($2, email),
           country = COALESCE($3, country),
           bio = COALESCE($4, bio),
           phone = COALESCE($5, phone),
           dob = COALESCE($6, dob),
           profile_image_url = COALESCE($7, profile_image_url)
       WHERE id = $8
       RETURNING id, name, email, username, country, bio, phone, dob, profile_image_url`,
      [
        name || null,
        email || null,
        country || null,
        bio || null,
        phone || null,
        dob || null,
        profile_image_url || null,
        userId,
      ]
    )

    return NextResponse.json(
      { success: true, user: result[0] },
      { status: 200 }
    )
  } catch (error) {
    console.error('PUT profile error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}
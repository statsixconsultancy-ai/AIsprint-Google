import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()

    const userId = cookieStore.get('user_id')?.value
    const authToken = cookieStore.get('auth_token')?.value

    if (!userId || !authToken) {
      return NextResponse.json(
        { success: false },
        { status: 401 }
      )
    }

    const users = await query(
      `SELECT id, name, email, username, profile_image_url FROM public.users WHERE id = $1`,
      [userId]
    )

    if (users.length === 0) {
      return NextResponse.json(
        { success: false },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      user: users[0],
    })
  } catch (error) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    )
  }
}
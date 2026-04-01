import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
  try {
    // ✅ Supabase client
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 })
    }
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    // ✅ Get user from cookie
    const cookieStore = cookies()
    const userId = cookieStore.get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    // ✅ Fetch from Supabase
    const { data, error } = await supabase
      .from('user_courses')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      throw error
    }

    // ✅ Format response
    return NextResponse.json(
      {
        courses: (data || []).map((course: any) => ({
          id: course.id,
          title: course.title,
          progress: course.progress || 0,
          completed: course.completed || false,
          certificate: course.certificate || false,
        })),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get user courses error:', error)

return NextResponse.json(
  { success: false, error: String(error) },
  { status: 500 }
)
  }
}
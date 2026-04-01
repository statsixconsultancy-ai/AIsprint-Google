'use client'

import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'

// ── USER DROPDOWN ──
function UserDropdown({ user }: any) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const name = user?.username || user?.name || 'User'

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)}>
        <div className="w-[2.25rem] h-[2.25rem] rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
          {name.charAt(0).toUpperCase()}
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-[16rem] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>

          <div className="py-1">
            <button onClick={() => router.push('/dashboard/profile')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
              Profile
            </button>

            <button onClick={() => router.push('/dashboard/settings')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
              Settings
            </button>

            <button onClick={() => router.push('/contact')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">
              Help
            </button>

            <div className="border-t border-gray-100 my-1" />

            <button onClick={() => router.push('/auth/signin')} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50">
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── HEADER ──
function DashboardHeader({ user }: any) {
  const pathname = usePathname()

  // Dynamic title (optional but clean)
  const getTitle = () => {
    if (pathname === '/dashboard') return 'Overview'
    if (pathname.includes('/courses')) return 'My Courses'
    if (pathname.includes('/certificates')) return 'Certificates'
    if (pathname.includes('/wishlist')) return 'Wishlist'
    if (pathname.includes('/settings')) return 'Settings'
    return 'Dashboard'
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between h-[4rem] px-[1.5rem] lg:px-[2rem]">

        <h1 className="text-[1rem] font-semibold text-gray-900">
          {getTitle()}
        </h1>

        <div className="hidden md:flex flex-1 justify-center">
          <div className="w-full max-w-[22rem]">
            <input
              placeholder="Search..."
              className="w-full h-[2.4rem] px-[0.875rem] border border-gray-200 rounded-lg text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-[2.25rem] h-[2.25rem] border border-gray-200 rounded-lg">
            🔔
          </button>
          <UserDropdown user={user} />
        </div>

      </div>
    </header>
  )
}

// ── MAIN LAYOUT ──
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/signin')
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-white flex">

      {/* Sidebar */}
      <DashboardSidebar /> {/* ✅ FIXED */}

      {/* Main */}
      <main className="flex-1 lg:pl-[15rem]">

        {/* Header */}
        <DashboardHeader user={user} />

        {/* Page Content */}
        <div className="px-5 lg:px-8 py-6">
          {children}
        </div>

      </main>
    </div>
  )
}
'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  user: {
    username?: string
    name?: string
    email?: string
    profile_image_url?: string
  } | null
}

export default function DashboardHeader({ user }: Props) {
  const router = useRouter()
  const name = user?.username || user?.name || 'User'

  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between h-[4rem] px-[1.5rem] lg:px-[2rem]">

        {/* LEFT */}
        <h1 className="text-[1rem] font-semibold text-gray-900">
          Dashboard
        </h1>

        {/* CENTER SEARCH */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="w-full max-w-[24rem] relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-[2.5rem] pl-[2.5rem] pr-[1rem] text-[0.875rem] border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <svg
              className="absolute left-[0.75rem] top-1/2 -translate-y-1/2 w-[1rem] h-[1rem] text-gray-400"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                d="M21 21l-4.35-4.35M16.65 10a6.65 6.65 0 11-13.3 0 6.65 6.65 0 0113.3 0z"
              />
            </svg>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-[0.75rem]">

          {/* Avatar + Dropdown */}
          <div className="relative" ref={dropdownRef}>

            {/* Avatar button */}
            <button onClick={() => setOpen(!open)}>
              <img
                src={user?.profile_image_url || '/avatar-placeholder.png'}
                alt="profile"
                className="w-[2.25rem] h-[2.25rem] rounded-full object-cover border border-gray-200"
              />
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-[0.75rem] w-[16rem] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">

                {/* User info */}
                <div className="flex flex-col items-center py-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold mb-2">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>

                {/* Menu */}
                <div className="py-2">

                  <button
                    onClick={() => {
                      setOpen(false)
                      router.push('/dashboard/profile')
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false)
                      router.push('/dashboard/settings')
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Settings
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false)
                      router.push('/contact')
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Help Center
                  </button>

                  <div className="border-t border-gray-100 my-2" />

                  <button
                    onClick={() => {
                      setOpen(false)
                      router.push('/auth/signin')
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
                  >
                    Sign Out
                  </button>

                </div>
              </div>
            )}
          </div>


        </div>
      </div>
    </header>
  )
}
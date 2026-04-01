'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/components/providers/AuthProvider'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated, user, signout, isLoading } = useAuth()

  const handleSignout = async () => {
    try {
      await signout()
      setIsOpen(false)
    } catch (error) {
      console.error('Sign out failed:', error)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <nav className="flex items-center justify-between h-14 md:h-16">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="AIsprint Logo"
              width={120}
              height={32}
              className="h-12 md:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              href="/courses"
              className="text-base font-medium text-gray-700 hover:text-black transition mr-8 md:mr-12"
            >
              Courses
            </Link>

            {!isLoading && !isAuthenticated ? (
              <>
                <Link
                  href="/auth/signin"
                  className="h-9 px-4 flex items-center text-sm md:text-base font-medium border border-black rounded-md hover:bg-gray-100 transition"
                >
                  Talk to an Advisor
                </Link>

                <Link
                  href="/auth/signup"
                  className="h-9 px-5 flex items-center text-sm md:text-base font-medium text-white bg-black rounded-md hover:bg-gray-900 transition"
                >
                  Get Started
                </Link>
              </>
            ) : !isLoading ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium">
                  Dashboard
                </Link>

                <button
                  onClick={handleSignout}
                  className="h-9 px-5 text-sm text-white bg-black rounded-md"
                >
                  Sign Out
                </button>
              </>
            ) : null}

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? '✕' : '☰'}
          </button>

        </nav>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden py-4 border-t flex flex-col gap-4">

            <Link
              href="/courses"
              onClick={() => setIsOpen(false)}
              className="text-base font-medium"
            >
              Courses
            </Link>

            {!isLoading && !isAuthenticated && (
              <>
                <Link
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                  className="py-2 border rounded-md text-center"
                >
                  Log In
                </Link>

                <Link
                  href="/auth/signup"
                  onClick={() => setIsOpen(false)}
                  className="py-2 text-center text-white bg-black rounded-md"
                >
                  Sign Up
                </Link>
              </>
            )}

          </div>
        )}

      </div>
    </header>
  )
}
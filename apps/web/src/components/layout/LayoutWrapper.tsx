'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatBox from '@/components/ChatBox'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // ✅ Hide layout on auth & dashboard routes
  const hideLayout =
    pathname?.startsWith('/auth') ||
    pathname?.startsWith('/dashboard')

  return (
    <>
      {/* Navbar */}
      {!hideLayout && <Navbar />}

      {/* Main Content */}
      <main className="min-h-screen bg-white">
        {children}
      </main>

      {/* Footer */}
      {!hideLayout && <Footer />}

      {/* Chat (always visible) */}
      <ChatBox />
    </>
  )
}
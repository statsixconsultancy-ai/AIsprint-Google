'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'

// Icons
const Icons = {
  overview: (
    <svg className="w-[1.15rem] h-[1.15rem]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  courses: (
    <svg className="w-[1.15rem] h-[1.15rem]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347" />
    </svg>
  ),
  certificates: (
    <svg className="w-[1.15rem] h-[1.15rem]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.5l2.12 5.11 5.52.44-4.2 3.6 1.28 5.38-4.72-2.88-4.73 2.88 1.29-5.38-4.21-3.6 5.52-.44L11.48 3.5z" />
    </svg>
  ),
}

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: Icons.overview },
  { name: 'My Courses', href: '/dashboard/courses', icon: Icons.courses },
  { name: 'Certificates', href: '/dashboard/certificates', icon: Icons.certificates },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { user, signout } = useAuth()

  return (
    <aside className="w-60 h-screen bg-white border-r fixed left-0 top-0 flex flex-col">

      {/* Logo */}
      <div className="px-5 h-14 flex items-center border-b">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/maillogo.png"
            alt="AIsprint Logo"
            width={88}
            height={88}
            className="rounded-md"
          />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              {item.icon}
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t">
        <p className="text-sm font-semibold truncate">{user?.name}</p>
        <button
          onClick={signout}
          className="text-red-500 text-sm mt-2 hover:underline"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
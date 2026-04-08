'use client'

import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'

export default function HeroSection() {
  const { user, isAuthenticated } = useAuth()

  return (
    <section className="relative bg-white pt-24 md:pt-28 lg:pt-32 pb-20 md:pb-24 min-h-[75vh] flex items-center">

      {/* Top Right User */}
      {isAuthenticated && user && (
        <div className="absolute top-4 md:top-6 right-4 md:right-6 flex items-center gap-2">
          <img
            src={user.profile_image_url || '/avatar-placeholder.png'}
            alt="avatar"
            className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover"
          />
          <span className="text-xs md:text-sm font-medium text-gray-700">
            {user.username}
          </span>
        </div>
      )}

      <div className="w-full max-w-3xl md:max-w-4xl mx-auto px-4 sm:px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-500 tracking-wide font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
          AI Career Mentorship Platform
        </div>

        {/* H1 */}
        <h1 className="text-3xl sm:text-4xl md:text-[3.25rem] font-bold tracking-tight text-gray-950 leading-[1.1] mb-3 md:mb-4">
          Learn AI. Build Real Projects.<br />
          Launch Your Career in AI.
        </h1>

        {/* Subheadline */}
        <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-md mx-auto mt-3">
          Master machine learning and prompt engineering through hands-on projects and 1:1 mentorship.
        </p>

        {/* CTA */}
        <div className="mt-5">
          <Link
            href="/courses"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-gray-950 text-white text-sm font-semibold hover:bg-gray-800 shadow-sm hover:shadow-md transition-all"
          >
            Start Your AI Journey
          </Link>
        </div>

      </div>
    </section>
  )
}
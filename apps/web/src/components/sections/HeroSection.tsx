'use client'

import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'

export default function HeroSection() {
  const { user, isAuthenticated } = useAuth()

  return (
    <section className="relative bg-white pt-24 md:pt-28 lg:pt-32 pb-20 md:pb-24">

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

      <div className="max-w-3xl md:max-w-4xl mx-auto px-4 sm:px-6 text-center">

        {/* 🔥 Top Badge */}
        <div className="inline-flex items-center gap-2 md:gap-1 px-3 md:px-4 py-1.5 md:py-2 mb-6 md:mb-8 rounded-full bg-gray-100 border border-gray-300  text-xs md:text-sm text-gray-700">
          <span>India’s top 1:1 live AI platform</span>

          <div className="flex -space-x-2">
          </div>
        </div>

        {/* 🔥 Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-black leading-[1.2] md:leading-[1.15] mb-4 md:mb-6">
          Launch Your Career In <br className="hidden sm:block" />
          <span> Artificial Intelligence</span>
        </h1>

        {/* 🔥 Subtitle */}
        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl md:max-w-2xl mx-auto mb-10 md:mb-12">
          Learn in-demand AI skills with real-world projects, expert mentors, and industry ready curriculum designed to get you hired faster
        </p>

      

      </div>
    </section>
  )
}
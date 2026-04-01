import { Metadata } from 'next'
import SignUpForm from '@/components/forms/SignUpForm'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Sign Up - AIsprint',
  description: 'Create your AIsprint account',
}

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4 py-6 relative overflow-hidden">

      {/* Background Orbs (same as signin) */}
      <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-purple-200/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-72 h-72 rounded-full bg-blue-200/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="group">
            <Image
              src="/logo.png"
              alt="AIsprint Logo"
              width={110}
              height={36}
              className="object-contain opacity-90 group-hover:opacity-100 transition"
              priority
            />
          </Link>
        </div>

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            Create your free account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Start your AI learning journey
          </p>
        </div>

        {/* Card (same as signin) */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200/50 p-5 sm:p-6 shadow-sm">
          <SignUpForm />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              href="/auth/signin"
              className="text-brand-600 hover:text-brand-700 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </main>
  )
}
import { Metadata } from 'next'
import SignInForm from '@/components/forms/SignInForm'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Sign In - AIsprint',
  description: 'Sign in to your AIsprint account and access your dashboard',
}

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4 py-6 relative overflow-hidden">

      {/* Background Orbs */}
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
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200/50 p-5 sm:p-6 shadow-sm">
          <SignInForm />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/signup"
              className="text-brand-600 hover:text-brand-700 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>

      </div>
    </main>
  )
}
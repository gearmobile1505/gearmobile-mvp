'use client'
import { useState } from 'react'
import Link from 'next/link'
import { signUp } from '@/lib/auth/actions'

export default function RegisterForm() {
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreeMarketing, setAgreeMarketing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    if (!agreeTerms) {
      setError('You must agree to the terms of service')
      setLoading(false)
      return
    }

    try {
      const result = await signUp(formData)
      if (result?.error) {
        setError(result.error)
        setLoading(false)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative">
      {/* Close Button */}
      <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </Link>

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-white">G</span>
          </div>
          <div className="text-lg font-semibold">
            <span className="text-gray-900">Gear</span>{' '}
            <span className="text-cyan-500">Mobile</span>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-6">Lets Get Started</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form action={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input 
              type="text"
              name="firstName"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input 
              type="text"
              name="lastName"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
          </div>
        </div>

        <p className="text-xs text-gray-500">Enter your name as it appears on your drivers lineense</p>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <div className="relative">
            <input 
              type="tel"
              name="phone"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
            <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <input 
              type="password"
              name="password"
              required
              minLength={6}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            />
            <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>

        {/* User Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">I want to</label>
          <select 
            name="userType"
            required
            defaultValue=""
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent bg-white"
          >
            <option value="" disabled>Select an option</option>
            <option value="customer">Rent tools</option>
            <option value="renter">List my tools and earn money</option>
            <option value="both">Both - rent and list tools</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">You can change this later in your account settings</p>
        </div>

        {/* Toggles */}
        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-5 h-5 text-cyan-400 rounded focus:ring-cyan-400"
            />
            <span className="text-sm text-gray-700">I agree to the terms of service and privacy policy.</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox"
              checked={agreeMarketing}
              onChange={(e) => setAgreeMarketing(e.target.checked)}
              className="w-5 h-5 text-cyan-400 rounded focus:ring-cyan-400"
            />
            <span className="text-sm text-gray-700">Yes, send me deals, discounts and Updates!</span>
          </label>
        </div>

        {/* Sign Up Button */}
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition mt-6"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        {/* Login Link */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an Account? </span>
          <Link href="/auth/login" className="text-gray-900 font-semibold hover:underline">
            Log In
          </Link>
        </div>

        {/* reCAPTCHA */}
        <p className="text-xs text-center text-gray-500 mt-4">
          This site is Protected by reCAPTCHA and the Google{' '}
          <a href="#" className="underline">Privacy Policy</a> and{' '}
          <a href="#" className="underline">Terms and Service</a> apply
        </p>
      </form>
    </div>
  )
}

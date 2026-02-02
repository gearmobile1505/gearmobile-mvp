'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState('booked')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
          <Link
            href="/activity"
            className="pb-4 px-4 font-semibold text-gray-600 hover:text-gray-900 transition"
          >
            ACTIVITY
          </Link>
          <button
            onClick={() => setActiveTab('booked')}
            className="pb-4 px-4 font-semibold text-cyan-500 border-b-4 border-cyan-500"
          >
            BOOKED
          </button>
          <Link
            href="/history"
            className="pb-4 px-4 font-semibold text-gray-600 hover:text-gray-900 transition"
          >
            HISTORY
          </Link>

          <div className="ml-auto">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent">
              <option>ALL</option>
              <option>Upcoming</option>
              <option>Past</option>
            </select>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-8">
            <svg className="w-32 h-32 text-gray-300" viewBox="0 0 120 120" fill="none" stroke="currentColor">
              <path d="M30 80 L60 40 L90 80" strokeWidth="3" strokeLinecap="round"/>
              <line x1="60" y1="40" x2="60" y2="80" strokeWidth="3" strokeDasharray="5,5" strokeLinecap="round"/>
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-400 mb-6">No Rental</h2>

          <div className="flex gap-4">
            <Link 
              href="/listings"
              className="bg-cyan-400 hover:bg-cyan-500 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Find a Tool
            </Link>
            <Link 
              href="/host/list"
              className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition"
            >
              List a Tool
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState('history')

  const historyByMonth = {
    'SEPTEMBER 2020': [
      {
        id: 1,
        title: 'Mercedes- benz-E-class 2019',
        dates: 'Sep 16 - Sep 19',
        image: null,
        canRebook: true,
        status: null
      },
      {
        id: 2,
        title: 'Chrvorolet Sonic 2013',
        dates: 'Sep 21 – Sep 22',
        image: null,
        canRebook: false,
        status: 'You cancelled on sep 10'
      },
      {
        id: 3,
        title: 'BMW 3 SERIES 2018',
        dates: 'Sep 3 - Sep 7',
        image: null,
        canRebook: false,
        status: null
      }
    ],
    'MARCH 2020': [
      {
        id: 4,
        title: 'Mercedes- benz-E-class 2019',
        dates: 'Sep 16 - Sep 19',
        image: null,
        canRebook: true,
        status: null
      }
    ]
  }

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
          <Link
            href="/bookings"
            className="pb-4 px-4 font-semibold text-gray-600 hover:text-gray-900 transition"
          >
            BOOKED
          </Link>
          <button
            onClick={() => setActiveTab('history')}
            className="pb-4 px-4 font-semibold text-cyan-500 border-b-4 border-cyan-500"
          >
            HISTORY
          </button>

          <div className="ml-auto">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent">
              <option>ALL</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        {/* History Content */}
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Rental History</h1>

          {Object.entries(historyByMonth).map(([month, rentals]) => (
            <div key={month} className="mb-12">
              <h2 className="text-lg font-bold mb-6 border-b border-gray-300 pb-2">{month}</h2>

              <div className="space-y-6">
                {rentals.map((rental) => (
                  <div 
                    key={rental.id}
                    className="flex items-center gap-6 pb-6 border-b border-gray-200 last:border-0"
                  >
                    {/* Image */}
                    <div className="w-32 h-24 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex-shrink-0"></div>

                    {/* Info */}
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">YOUR RENTAL</p>
                      <h3 className="text-xl font-bold mb-1">{rental.title}</h3>
                      <p className="text-gray-600">{rental.dates}</p>
                      {rental.status && (
                        <p className="text-sm text-gray-500 mt-1">{rental.status}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      {rental.canRebook && (
                        <button className="text-cyan-400 font-semibold hover:underline px-4">
                          Book again
                        </button>
                      )}
                      <Link
                        href={`/bookings/${rental.id}`}
                        className="bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-semibold transition"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

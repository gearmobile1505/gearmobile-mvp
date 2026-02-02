'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AccountEditPage() {
  const router = useRouter()
  const [location, setLocation] = useState('Eastern, MA / Paris, France')
  const [about, setAbout] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm relative overflow-hidden max-w-4xl mx-auto">
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-20 w-32 h-32 border-4 border-purple-300 rounded-full"></div>
            <div className="absolute top-20 right-32 w-24 h-1 bg-purple-300"></div>
            <div className="absolute bottom-20 left-1/3 w-16 h-16 border-4 border-purple-300 rounded-full"></div>
          </div>

          {/* Header Buttons */}
          <div className="absolute top-6 right-6 flex gap-3 z-10">
            <button 
              onClick={() => router.push('/account')}
              className="px-6 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:border-gray-400 transition"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-cyan-400 hover:bg-cyan-500 text-white rounded-lg font-semibold transition">
              Save
            </button>
          </div>

          {/* Content */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              {/* Profile Photo */}
              <div className="mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-16 h-16 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-center mb-2">
                  <div className="inline-flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                    <span className="font-bold">5.0</span>
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                </div>
                <button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white py-2 rounded-lg font-semibold transition">
                  Change profile photo
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  add a face to the name.It'll help other hosts and guests recognize youat the begining of a Rental.
                </p>
              </div>

              {/* Name */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-4">Marcaelis</h2>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block font-semibold mb-2">LIVES</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  placeholder="City, State / Country"
                />
                <p className="text-sm text-gray-500 mt-1">Joined Dec 2019</p>
              </div>

              {/* Verified Info */}
              <div className="mb-6">
                <h3 className="font-bold mb-4">VERIFIED INFO</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Approved to Rent</span>
                    <button className="text-cyan-400 font-semibold hover:underline">Verify ID</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Email address</span>
                    <button className="text-cyan-400 font-semibold hover:underline">Verify email</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Phone number</span>
                    <button className="text-cyan-400 font-semibold hover:underline">Verify Number</button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Build trust with other users on Gear mobile by verifying your contact information
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* About Section */}
              <div className="mb-6">
                <label className="block font-bold mb-2">ABOUT MARCAELIS</label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none"
                  placeholder="Tell hosts and guests about yourself and  why you're a responsible, trustworthy person! Feel free to include links to your linkedin,Twitter, or Facebook profiles so they get to know you even better."
                />
              </div>

              {/* Reviews */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">REVIEWS FROM HOSTS</h3>
                  <span className="text-sm text-gray-600">• 4 Rentals</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold">5.0</span>
                  <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="text-gray-500 text-sm">( 4 review )</span>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-4">
                  {[1, 2].map((idx) => (
                    <div key={idx} className="border-t border-gray-200 pt-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold">Samuel L</span>
                            <span className="text-sm text-gray-500">September 19,2020</span>
                          </div>
                          <div className="flex text-yellow-400 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-sm text-gray-700">
                            Highly recommended driver, kept the car in very perfect condition. A++. We Hope See you coming back to rent again
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Favorites */}
              <div>
                <h3 className="font-bold mb-4">MARCAELIS'S FAVOURITES</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {['Mercedes- Benz C...', 'Audi Q7 2013'].map((item, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="h-24 bg-gradient-to-br from-gray-300 to-gray-400"></div>
                      <div className="p-3">
                        <h4 className="font-semibold text-sm mb-1">{item}</h4>
                        <div className="flex items-center gap-1 text-xs mb-2">
                          <span className="font-semibold">{idx === 0 ? '4.88' : '5.0'}</span>
                          <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <span className="text-gray-500">({idx === 0 ? '9' : '5'} Rent)</span>
                        </div>
                        <div className="text-right text-sm">
                          <span className="font-bold">${idx === 0 ? '67' : '100'}/day</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white py-2 rounded-lg font-semibold transition">
                  View all favourites
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

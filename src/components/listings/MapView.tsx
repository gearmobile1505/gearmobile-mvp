'use client'
import { useState } from 'react'

// Mock listing data with locations
const mockListings = [
  { id: 1, lat: 35, lng: 40, title: 'Power Drill Set', price: 25, address: '123 Main St' },
  { id: 2, lat: 55, lng: 30, title: 'Camera Kit', price: 50, address: '456 Oak Ave' },
  { id: 3, lat: 45, lng: 65, title: 'Guitar', price: 35, address: '789 Pine Rd' },
  { id: 4, lat: 70, lng: 50, title: 'Lawn Mower', price: 40, address: '321 Elm St' },
  { id: 5, lat: 25, lng: 55, title: 'Projector', price: 45, address: '654 Maple Dr' },
  { id: 6, lat: 60, lng: 75, title: 'Pressure Washer', price: 30, address: '987 Cedar Ln' }
]

export default function MapView() {
  const [selectedListing, setSelectedListing] = useState<number | null>(null)

  return (
    <div className="sticky top-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[calc(100vh-8rem)]">
        {/* Map Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Tools near you | {mockListings.length} available</span>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>

        {/* Map with Tool Location Markers */}
        <div className="relative w-full h-full bg-gradient-to-br from-blue-100 via-gray-100 to-green-100">
          {/* Individual Tool Markers */}
          {mockListings.map((listing) => (
            <div
              key={listing.id}
              style={{ 
                position: 'absolute',
                top: `${listing.lat}%`,
                left: `${listing.lng}%`,
                transform: 'translate(-50%, -100%)'
              }}
              className="cursor-pointer group"
              onClick={() => setSelectedListing(listing.id)}
            >
              {/* Pin Marker */}
              <div className="relative">
                <svg 
                  className={`w-10 h-10 transition ${
                    selectedListing === listing.id 
                      ? 'text-cyan-500 scale-125' 
                      : 'text-cyan-400 group-hover:text-cyan-500 group-hover:scale-110'
                  }`}
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                
                {/* Price Badge on Marker */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-white rounded-full px-2 py-0.5 shadow-md">
                  <span className="text-xs font-bold text-gray-900">${listing.price}</span>
                </div>
              </div>

              {/* Hover Popup */}
              {selectedListing === listing.id && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 w-48 z-10 animate-fade-in">
                  <div className="text-sm font-semibold mb-1">{listing.title}</div>
                  <div className="text-xs text-gray-600 mb-2">{listing.address}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-cyan-500">${listing.price}/day</span>
                    <button className="text-xs bg-cyan-400 text-white px-3 py-1 rounded-lg hover:bg-cyan-500">
                      View
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
          </div>

          {/* Current Location Button */}
          <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 transition z-10">
            <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 text-xs">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
              <span>Available tools</span>
            </div>
            <div className="text-gray-500">Click markers to view details</div>
          </div>
        </div>
      </div>
    </div>
  )
}

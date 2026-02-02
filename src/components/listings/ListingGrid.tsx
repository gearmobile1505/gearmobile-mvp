'use client'
import Link from 'next/link'

interface Listing {
  id: string
  title: string
  description: string
  daily_rate_cents: number
  location_city: string
  location_state: string
  owner?: {
    full_name: string
    rating_as_owner: number
  }
}

export default function ListingGrid({ listings }: { listings: Listing[] }) {
  if (listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-400 mb-2">No listings found</h3>
        <p className="text-gray-500">Try adjusting your filters or search area</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {listings.map((listing) => (
        <Link 
          href={`/listings/${listing.id}`}
          key={listing.id}
          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer group"
        >
          {/* Image */}
          <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            {/* Heart Icon */}
            <button 
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition z-10"
            >
              <svg className="w-5 h-5 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{listing.title}</h3>
            <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
              <span>{listing.location_city}, {listing.location_state}</span>
              {listing.owner && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="font-semibold">{listing.owner.rating_as_owner.toFixed(1)}</span>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold">${(listing.daily_rate_cents / 100).toFixed(0)}</span>
                <span className="text-gray-500 text-sm">/day</span>
              </div>
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                className="bg-cyan-400 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Book
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState, useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface Listing {
  id: string
  title: string
  daily_rate_cents: number
  location_city: string
  location_state: string
  location_lat: number | null
  location_lng: number | null
}

// Fix for default marker icon in Leaflet
const createCustomIcon = (price: number) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative">
        <svg class="w-10 h-10 text-cyan-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <div class="absolute top-1 left-1/2 -translate-x-1/2 bg-white rounded-full px-2 py-0.5 shadow-md whitespace-nowrap">
          <span class="text-xs font-bold text-gray-900">$${price}</span>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  })
}

export default function LeafletMap({ listings }: { listings: Listing[] }) {
  const [isMounted, setIsMounted] = useState(false)
  
  // Fix for SSR - Leaflet only works on client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const validListings = listings.filter(l => l.location_lat && l.location_lng)

  if (!isMounted) {
    return (
      <div className="sticky top-6">
        <div className="bg-white rounded-lg shadow-sm h-[calc(100vh-8rem)] flex items-center justify-center">
          <div className="text-gray-500">Loading map...</div>
        </div>
      </div>
    )
  }

  if (validListings.length === 0) {
    return (
      <div className="sticky top-6">
        <div className="bg-white rounded-lg shadow-sm p-6 h-[calc(100vh-8rem)] flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p>No listings with locations to display</p>
          </div>
        </div>
      </div>
    )
  }

  const center: [number, number] = [
    validListings[0].location_lat!,
    validListings[0].location_lng!
  ]

  return (
    <div className="sticky top-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[calc(100vh-8rem)]">
        {/* Map Header */}
        <div className="p-4 border-b flex items-center justify-between bg-white z-10">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Tools near you | {validListings.length} available</span>
          </div>
        </div>

        {/* OpenStreetMap */}
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: 'calc(100% - 60px)', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {validListings.map((listing) => (
            <Marker
              key={listing.id}
              position={[listing.location_lat!, listing.location_lng!]}
              icon={createCustomIcon((listing.daily_rate_cents / 100))}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold mb-1">{listing.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">
                    {listing.location_city}, {listing.location_state}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-cyan-500">
                      ${(listing.daily_rate_cents / 100).toFixed(0)}/day
                    </span>
                    <a 
                      href={`/listings/${listing.id}`}
                      className="text-xs bg-cyan-400 text-white px-3 py-1 rounded hover:bg-cyan-500"
                    >
                      View
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

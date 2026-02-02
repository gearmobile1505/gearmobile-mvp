'use client'
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps'
import { useState } from 'react'

interface Listing {
  id: string
  title: string
  daily_rate_cents: number
  location_city: string
  location_state: string
  location_lat: number | null
  location_lng: number | null
}

export default function GoogleMapView({ listings }: { listings: Listing[] }) {
  // Filter listings with valid coordinates
  const validListings = listings.filter(l => l.location_lat && l.location_lng)
  const [selectedListing, setSelectedListing] = useState<string | null>(null)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  
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

  // If no API key, show setup instructions
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return (
      <div className="sticky top-6">
        <div className="bg-white rounded-lg shadow-sm p-6 h-[calc(100vh-8rem)] flex items-center justify-center">
          <div className="text-center max-w-md">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Google Maps API Key Required</h3>
            <p className="text-sm text-gray-600 mb-4">
              To display the interactive map, add your Google Maps API key to <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>
            </p>
            <div className="text-left bg-gray-50 rounded-lg p-4 text-xs">
              <p className="font-semibold mb-2">Steps:</p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Go to Google Cloud Console</li>
                <li>Enable Maps JavaScript API</li>
                <li>Create API key</li>
                <li>Add to .env.local as:<br/>
                  <code className="block mt-1 bg-white p-2 rounded">
                    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
                  </code>
                </li>
                <li>Restart dev server</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }

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

        {/* Google Map */}
        <APIProvider apiKey={apiKey}>
          <Map
            defaultCenter={{ 
              lat: validListings[0].location_lat!, 
              lng: validListings[0].location_lng! 
            }}
            defaultZoom={13}
            mapId="gearmobile-map"
            style={{ width: '100%', height: 'calc(100% - 60px)' }}
          >
            {validListings.map((listing) => (
              <AdvancedMarker
                key={listing.id}
                position={{ lat: listing.location_lat!, lng: listing.location_lng! }}
                onClick={() => setSelectedListing(listing.id)}
              >
                {/* Custom Marker */}
                <div className="relative cursor-pointer group">
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
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-white rounded-full px-2 py-0.5 shadow-md">
                    <span className="text-xs font-bold text-gray-900">${(listing.daily_rate_cents / 100).toFixed(0)}</span>
                  </div>
                </div>
              </AdvancedMarker>
            ))}

            {/* Info Window */}
            {selectedListing && validListings.find(l => l.id === selectedListing) && (
              <InfoWindow
                position={{
                  lat: validListings.find(l => l.id === selectedListing)!.location_lat!,
                  lng: validListings.find(l => l.id === selectedListing)!.location_lng!
                }}
                onCloseClick={() => setSelectedListing(null)}
              >
                <div className="p-2">
                  <h3 className="font-semibold mb-1">
                    {validListings.find(l => l.id === selectedListing)!.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    {validListings.find(l => l.id === selectedListing)!.location_city}, {validListings.find(l => l.id === selectedListing)!.location_state}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-cyan-500">
                      ${(validListings.find(l => l.id === selectedListing)!.daily_rate_cents / 100).toFixed(0)}/day
                    </span>
                    <button className="text-xs bg-cyan-400 text-white px-3 py-1 rounded hover:bg-cyan-500">
                      View
                    </button>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>
    </div>
  )
}

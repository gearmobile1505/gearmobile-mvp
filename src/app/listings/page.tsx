import FilterSidebar from '@/components/listings/FilterSidebar'
import ListingGrid from '@/components/listings/ListingGrid'
import GoogleMapView from '@/components/listings/GoogleMapView'
import { createClient } from '@/lib/supabase/server'

export default async function ListingsPage() {
  const supabase = await createClient()
  
  // Fetch listings from database
  const { data: listings, error } = await supabase
    .from('listings')
    .select(`
      *,
      owner:users(full_name, rating_as_owner)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching listings:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex gap-4 overflow-x-auto">
            {['Sort by:', 'Price', 'Musical Instruments', 'Pro Audio and Stage', 'Tools', 'Camera and video', 'Other Equipment'].map((tab, idx) => (
              <button
                key={idx}
                className={`px-6 py-2 rounded-lg whitespace-nowrap transition ${
                  idx === 0 
                    ? 'bg-cyan-400 text-white font-semibold' 
                    : 'bg-white border border-gray-300 hover:border-cyan-400 text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Listings Grid */}
          <div className="flex-1">
            <ListingGrid listings={listings || []} />
          </div>

          {/* Map View */}
          <div className="w-96 flex-shrink-0">
            <GoogleMapView listings={listings || []} />
          </div>
        </div>
      </div>
    </div>
  )
}

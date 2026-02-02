import ImageGallery from '@/components/listing-detail/ImageGallery'
import BookingCard from '@/components/listing-detail/BookingCard'
import HostInfo from '@/components/listing-detail/HostInfo'
import Reviews from '@/components/listing-detail/Reviews'
import RelatedListings from '@/components/listing-detail/RelatedListings'

export default function ListingDetailPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Image Gallery */}
      <ImageGallery />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left Column */}
          <div className="flex-1">
            <HostInfo />
            
            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Overall Rating */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xl font-semibold">5.0</span>
              </div>
            </div>

            <Reviews />
          </div>

          {/* Right Column - Booking Card */}
          <div className="w-96">
            <BookingCard />
          </div>
        </div>

        {/* Related Listings */}
        <RelatedListings />
      </div>
    </div>
  )
}

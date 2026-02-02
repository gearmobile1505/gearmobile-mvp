import ProfileHeader from '@/components/account/ProfileHeader'
import VerifiedInfo from '@/components/account/VerifiedInfo'
import ReviewsSection from '@/components/account/ReviewsSection'
import FavoritesSection from '@/components/account/FavoritesSection'

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <ProfileHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <VerifiedInfo />
          <ReviewsSection />
        </div>

        <FavoritesSection />
      </div>
    </div>
  )
}

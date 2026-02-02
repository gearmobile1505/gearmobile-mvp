import Link from 'next/link'

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-black bg-opacity-90 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md text-center">
        {/* Tool Icon */}
        <div className="mb-8">
          <svg className="w-32 h-32 mx-auto text-gray-400" viewBox="0 0 100 100" fill="none">
            <path d="M35 65 L50 50 L35 35" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="70" cy="35" r="8" fill="currentColor"/>
            <path d="M30 70 L50 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <rect x="48" y="28" width="8" height="35" rx="2" fill="#FCD34D" transform="rotate(45 52 45)"/>
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-4">Your rental is booked</h1>
        <p className="text-gray-600 mb-8">You'll receive a confirmation email shortly</p>

        <div className="space-y-3">
          <Link 
            href="/account/bookings"
            className="block w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-3 rounded-lg transition"
          >
            View My Bookings
          </Link>
          <Link 
            href="/"
            className="block w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

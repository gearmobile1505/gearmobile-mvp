export default function ProfileHeader() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 w-32 h-32 border-4 border-purple-300 rounded-full"></div>
        <div className="absolute top-20 right-32 w-24 h-1 bg-purple-300"></div>
        <div className="absolute bottom-20 left-1/3 w-16 h-16 border-4 border-purple-300 rounded-full"></div>
        <div className="absolute top-1/2 right-20 w-20 h-20 border-4 border-purple-300 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative flex items-start justify-between">
        <div className="flex items-start gap-6">
          {/* Profile Photo */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <span className="font-bold">5.0</span>
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Marcaelis</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="font-semibold">4 Rentals</span>
              <span>•</span>
              <span>Joined Dec 2019</span>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <button className="bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-semibold transition">
          Edit Profile
        </button>
      </div>
    </div>
  )
}

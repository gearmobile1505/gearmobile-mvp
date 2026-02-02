export default function Hero() {
  return (
    <div className="relative min-h-[600px] bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center text-white">
          <div className="text-2xl font-bold">GearMobile</div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Rent</a>
            <a href="#" className="hover:underline">Rentals</a>
            <a href="#" className="hover:underline">Learn More</a>
            <a href="#" className="hover:underline">Messages</a>
            <a href="#" className="hover:underline">Account</a>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <h1 className="text-6xl font-bold text-white mb-4">
          Let's get you<br />Connected!
        </h1>
        <p className="text-white/90 text-lg mb-12 max-w-md">
          Find the best equipment rental near you. Rent equipment from neighbors in your city.
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Where</label>
              <input 
                type="text" 
                placeholder="City or ZIP"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Check In</label>
              <input 
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Check Out</label>
              <input 
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Categories</option>
                <option>Musical Instruments</option>
                <option>Tools</option>
                <option>Camera & Video</option>
                <option>Audio</option>
              </select>
            </div>
            <div className="md:col-span-1 flex items-end">
              <button className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-3 rounded-lg transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"></div>
    </div>
  )
}

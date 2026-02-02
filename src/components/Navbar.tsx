import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold">
              <span className="text-gray-900">Gear</span>
              <span className="text-cyan-500">Mobile</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-cyan-500 font-medium transition">
              Home
            </Link>
            <Link href="/listings" className="text-gray-700 hover:text-cyan-500 font-medium transition">
              Browse
            </Link>
            <Link href="/bookings" className="text-gray-700 hover:text-cyan-500 font-medium transition">
              Rentals
            </Link>
            <Link href="/activity" className="text-gray-700 hover:text-cyan-500 font-medium transition">
              Activity
            </Link>
            <Link href="/account" className="text-gray-700 hover:text-cyan-500 font-medium transition">
              Account
            </Link>
            <Link 
              href="/auth/login" 
              className="bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

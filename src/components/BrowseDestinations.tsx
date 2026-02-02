'use client'

export default function BrowseDestinations() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Browse equipments by destination</h2>
        
        <div className="relative">
          <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center text-white hover:bg-cyan-500 shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-6 overflow-hidden px-16">
            {['Los Angeles', 'New York', 'San Francisco'].map((city, idx) => (
              <div 
                key={idx}
                className="min-w-[300px] h-64 rounded-2xl overflow-hidden relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"></div>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold">{city}</h3>
                </div>
              </div>
            ))}
          </div>

          <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center text-white hover:bg-cyan-500 shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

'use client'

export default function BrowseCategories() {
  const categories = [
    { name: 'Musical Instruments', icon: '🎸' },
    { name: 'Tools', icon: '🔧' },
    { name: 'Camera & Video', icon: '📷' },
    { name: 'Pro Audio & Stage', icon: '🎤' },
    { name: 'Miscellaneous', icon: '📦' },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Browse by category</h2>
        
        <div className="flex items-center gap-6 justify-center">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-6 overflow-hidden">
            {categories.map((cat, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-center min-w-[140px] p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-cyan-400 hover:shadow-lg transition cursor-pointer"
              >
                <div className="text-5xl mb-3">{cat.icon}</div>
                <p className="text-sm font-medium text-center text-gray-700">{cat.name}</p>
              </div>
            ))}
          </div>

          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

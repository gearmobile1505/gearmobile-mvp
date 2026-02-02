'use client'

const relatedItems = Array.from({ length: 5 }, () => ({
  title: 'Chevrolet Spark 2016',
  rating: 4.7,
  reviews: 103,
  price: 30
}))

export default function RelatedListings() {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">You might also like</h2>
      
      <div className="relative">
        <button className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="grid grid-cols-5 gap-4">
          {relatedItems.map((item, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
              <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300"></div>
              <div className="p-3">
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <div className="flex items-center gap-1 text-xs mb-2">
                  <span className="font-semibold">{item.rating}</span>
                  <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="text-gray-500">({item.reviews})</span>
                </div>
                <div className="font-bold">${item.price}/day</div>
              </div>
            </div>
          ))}
        </div>

        <button className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

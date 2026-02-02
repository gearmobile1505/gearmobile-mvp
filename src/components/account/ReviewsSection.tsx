export default function ReviewsSection() {
  const reviews = [
    {
      name: 'Samuel L',
      date: 'September 19,2020',
      rating: 5,
      text: 'Highly recommended driver, kept the car in very perfect condition. A++. We Hope See you coming back to rent again'
    },
    {
      name: 'Johon L',
      date: 'September 7, 2020',
      rating: 5,
      text: 'Highly recommended driver, kept the car in very perfect condition. A++. We Hope See you coming back to rent again'
    }
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">REVIEWS FROM HOSTS</h2>
        <span className="text-sm text-gray-600">• 4 Rentals</span>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl font-bold">5.0</span>
        <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        <span className="text-gray-500 text-sm">( 4 review )</span>
      </div>

      <div className="space-y-6">
        {reviews.map((review, idx) => (
          <div key={idx} className="border-t border-gray-200 pt-4">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold">{review.name}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex text-yellow-400 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{review.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

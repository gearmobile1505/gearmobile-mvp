export default function FavoritesSection() {
  const favorites = [
    { title: 'Mercedes- Benz C...', rating: 4.86, rentals: 9, price: 67 },
    { title: 'Audi Q7 2013', rating: 5.0, rentals: 5, price: 100 }
  ]

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">MARCAELIS'S FAVOURITES</h2>
      
      <div className="grid grid-cols-2 gap-6">
        {favorites.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer">
            <div className="h-48 bg-gradient-to-br from-gray-300 to-gray-400"></div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-semibold">{item.rating}</span>
                <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="text-gray-500 text-sm">({item.rentals} Rentals)</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold">${item.price}</span>
                <span className="text-gray-500">/day</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button className="bg-cyan-400 hover:bg-cyan-500 text-white px-8 py-3 rounded-lg font-semibold transition">
          View all favourites
        </button>
      </div>
    </div>
  )
}

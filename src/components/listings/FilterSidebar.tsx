'use client'
import { useState } from 'react'

export default function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 500])

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm sticky top-6">
      {/* Location */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-semibold">Location</span>
        </div>
        <input 
          type="text" 
          placeholder="Enter city or ZIP"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm"
        />
      </div>

      {/* Tools Category */}
      <div className="mb-6">
        <button className="w-full flex items-center justify-between font-semibold mb-3">
          <span>Tools</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="space-y-2">
          {['Keyboards', 'Keyboards', 'Keyboards', 'Keyboards'].map((item, idx) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-cyan-400 rounded focus:ring-cyan-400" />
              <span className="text-sm text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* More Categories */}
      <div className="space-y-3 mb-6">
        {['Tools', 'Tools', 'Tools', 'Tools', 'Tools'].map((cat, idx) => (
          <div key={idx} className="text-sm text-gray-700 pl-6">{cat}</div>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <div className="font-semibold mb-3">Price Range</div>
        <div className="px-2">
          <input 
            type="range" 
            min="0" 
            max="500" 
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

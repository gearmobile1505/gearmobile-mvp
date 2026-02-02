export default function HostInfo() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
          <svg className="w-7 h-7 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <div className="text-sm text-gray-600">Hosted by</div>
          <div className="font-semibold text-lg">John Doe</div>
        </div>
        <div className="ml-auto">
          <div className="inline-flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
            <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="font-semibold">5.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}

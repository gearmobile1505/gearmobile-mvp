export default function InsurancePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left: Text */}
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Damage waivers<br />
                for property<br />
                damage & theft
              </h1>
            </div>

            {/* Right: Illustration */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl p-12 shadow-lg">
                <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                  <svg className="w-24 h-24 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ATHOS Logo */}
      <div className="text-center py-12">
        <div className="inline-block">
          <div className="text-3xl font-bold mb-2">
            <span className="text-orange-500">ATHOS</span>
          </div>
          <div className="text-sm text-gray-600">Insurance<span className="text-orange-500">Services</span></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Share with Confidence */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Share your Equipment with Confidence</h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            All Gear Mobile customers have the option to purchase damage waivers for the duration of there rental. 
            If the customer declines they are fully responsible for any damage or theft that occurs while the equipment is in there possesion.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto mb-20">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-8">
              <svg className="w-32 h-32 text-gray-400" viewBox="0 0 100 100" fill="none">
                <path d="M35 65 L50 50 L35 35" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="70" cy="35" r="8" fill="currentColor"/>
                <path d="M30 70 L50 50" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                <rect x="48" y="28" width="8" height="35" rx="2" fill="#FCD34D" transform="rotate(45 52 45)"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Up to $20, 000 in damage and theft coverage</h3>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-8">
              <div className="flex items-center gap-4">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="bg-cyan-400 rounded-lg p-4 text-white">
                  <div className="text-xs mb-2">SEPTEMBER</div>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    {Array.from({ length: 30 }, (_, i) => (
                      <div key={i} className="w-4 h-4 flex items-center justify-center">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Varying days of protection.</h3>
            <p className="text-gray-600">
              Choose the amount of days your rental will last and only pay for coverage for those specific dates.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-600 text-center">
            <span className="mr-2">*</span>
            All ATHOS insurance liability in the US is offerd through Gear Mobile Term conditions and exclusions apply
          </p>
        </div>
      </div>
    </div>
  )
}

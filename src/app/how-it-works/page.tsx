import Link from 'next/link'

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: 'Find the tool your looking for',
      description: 'Browse thousands of tools and equipment available in your area. From power tools to cameras to musical instruments.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      number: 2,
      title: 'Book your rental',
      description: 'Choose your dates, add optional insurance, and complete your booking. Secure payment through our platform.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: 3,
      title: 'Pick up your Gear!',
      description: 'Meet the owner at the agreed location. Inspect the equipment and start your project!',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">How Gear Mobile Works</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Rent equipment from trusted owners in your community. Simple, secure, and affordable.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-8">
                {/* Number */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-cyan-500">{step.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                      <p className="text-gray-700 text-lg leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <div className="flex gap-4 justify-center">
            <Link
              href="/listings"
              className="bg-cyan-400 hover:bg-cyan-500 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Browse Equipment
            </Link>
            <Link
              href="/auth/register"
              className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DamageWaivers() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-400 text-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6">
              Damage waivers<br />for property<br />damage & theft
            </h2>
            <div className="bg-white p-4 inline-block rounded-lg">
              <div className="text-gray-700 font-bold text-xl">ATHOS</div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-white rounded-2xl p-8 text-gray-800">
              <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-24 h-24 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-center text-sm text-gray-600">Protection for your valuable equipment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Camera equipment images at bottom */}
      <div className="mt-12 flex justify-center gap-8">
        <div className="w-32 h-32 bg-white/20 rounded-lg"></div>
        <div className="w-32 h-32 bg-white/20 rounded-lg"></div>
        <div className="w-32 h-32 bg-white/20 rounded-lg"></div>
      </div>
    </section>
  )
}

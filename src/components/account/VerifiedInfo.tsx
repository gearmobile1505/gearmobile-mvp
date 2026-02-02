export default function VerifiedInfo() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-bold mb-6">VERIFIED INFO</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <span className="text-gray-700">Approved to Rent</span>
          <button className="text-cyan-400 font-semibold hover:underline">Verify ID</button>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <span className="text-gray-700">Email address</span>
          <button className="text-cyan-400 font-semibold hover:underline">Verify email</button>
        </div>
        
        <div className="flex items-center justify-between py-3">
          <span className="text-gray-700">Phone number</span>
          <button className="text-cyan-400 font-semibold hover:underline">Verify Number</button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        Build trust with other users on Gear mobile by verifying your contact information
      </p>
    </div>
  )
}

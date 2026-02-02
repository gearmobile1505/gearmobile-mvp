'use client'

interface Props {
  isOpen: boolean
  onClose: () => void
  onPurchase: () => void
  onDecline: () => void
}

export default function InsuranceDeclineModal({ isOpen, onClose, onPurchase, onDecline }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl p-12 max-w-2xl w-full relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Are you sure?</h2>
          <p className="text-gray-700 text-lg mb-8">
            You'll be responsible for any physical  damage to or theft of the equipment
          </p>

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={onPurchase}
              className="bg-cyan-400 hover:bg-cyan-500 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Purchase damage waiver
            </button>
            <button
              onClick={onDecline}
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-50 px-8 py-3 rounded-lg font-semibold transition"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

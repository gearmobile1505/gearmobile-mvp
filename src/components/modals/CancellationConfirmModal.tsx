'use client'

interface Props {
  isOpen: boolean
  onClose: () => void
  refundAmount: number
}

export default function CancellationConfirmModal({ isOpen, onClose, refundAmount }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-2xl p-12 max-w-2xl w-full relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Your rental was cancelled</h2>
          <p className="text-gray-700 text-lg mb-8">
            Your refund of ${refundAmount.toFixed(2)} has been initiated. it typically takes 3-5 business days to show up on your payment method.
          </p>

          {/* Button */}
          <button
            onClick={onClose}
            className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-50 px-12 py-3 rounded-lg font-semibold transition"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}

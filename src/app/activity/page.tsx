'use client'
import { useState } from 'react'

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState('activity')

  const notifications = [
    {
      type: 'system',
      title: 'Finish listing',
      message: 'Finish listing your tool today to start earning.',
      time: 'Friday,January 1, 8:55 PM'
    },
    {
      type: 'system',
      title: 'Finish listing',
      message: 'Finish listing your tool today to start earning.',
      time: 'Wednesday,December 30, 9:55 PM'
    },
    {
      type: 'alert',
      title: 'Car will be relisted',
      message: 'The snooze period for your badge carger ends tommorrow,so your tool will be automatically relisted. If you\'re not ready, You can extend trhe snooze.',
      time: 'Wednesday, December 30, 12:02 PM'
    },
    {
      type: 'promo',
      title: '10% host discount',
      message: 'Take 10% off your next Rentals with LoArt. and use code 9MJD4J77 at checkout Book soon- this unique discount code expires on Dec 18!',
      time: 'Saturday, September 19, 11: 32 AM'
    },
    {
      type: 'success',
      title: 'Confirmed change request',
      message: 'loArt has confirmed your change request.',
      time: 'Saturday, September 19, 6: 32 AM'
    },
    {
      type: 'user',
      title: 'Change request Pending',
      message: 'Your\'ve requested change your rentals with LoArt\'s Mercedes-benz E- class. LoArt has unitil 11.21 PM on Friday,September 18, 2020 to confirm the changes.',
      time: 'Saturday, September 18, 6: 32 AM'
    },
    {
      type: 'message',
      title: 'New message',
      message: 'LoArt Has sent you a message about their Mercendes- benz E - Class.',
      time: 'Saturday, September 18, 6: 32 AM'
    },
    {
      type: 'trip',
      title: 'Upcoming Trip',
      message: 'Your rental starts at 9.30 PM. Don\'t forget to check in when you arrive.',
      time: 'Wednesday, September 16,9:31 PM'
    }
  ]

  const getIcon = (type: string) => {
    if (type === 'system') {
      return (
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xl">G</span>
        </div>
      )
    }
    if (type === 'user' || type === 'promo' || type === 'message') {
      return (
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gray-300"></div>
        </div>
      )
    }
    return (
      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-xl">G</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('activity')}
            className={`pb-4 px-4 font-semibold transition ${
              activeTab === 'activity'
                ? 'text-cyan-500 border-b-4 border-cyan-500'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ACTIVITY
          </button>
          <button
            onClick={() => setActiveTab('booked')}
            className={`pb-4 px-4 font-semibold transition ${
              activeTab === 'booked'
                ? 'text-cyan-500 border-b-4 border-cyan-500'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            BOOKED
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-4 px-4 font-semibold transition ${
              activeTab === 'history'
                ? 'text-cyan-500 border-b-4 border-cyan-500'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            HISTORY
          </button>

          <div className="ml-auto">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent">
              <option>ALL</option>
              <option>Unread</option>
              <option>Messages</option>
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-bold text-lg">NOTIFICATION</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {notifications.map((notif, idx) => (
              <div key={idx} className="p-6 hover:bg-gray-50 transition cursor-pointer">
                <div className="flex gap-4">
                  {getIcon(notif.type)}
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">{notif.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-2">{notif.message}</p>
                    <span className="text-xs text-gray-500">{notif.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

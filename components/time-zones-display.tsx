'use client'

import React, { useEffect, useState } from 'react'

function TimezonesDisplay() {
  const [times, setTimes] = useState({
    Dubai: '',
    London: '',
    'Addis Ababa': '',
    China: '',
  })

  const updateTimes = () => {
    const format = (tz: string) =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: tz,
      }).format(new Date())

    setTimes({
      Dubai: format('Asia/Dubai'),
      London: format('Europe/London'),
      'Addis Ababa': format('Africa/Addis_Ababa'),
      China: format('Asia/Shanghai')
    })
  }

  useEffect(() => {
    updateTimes()
    const interval = setInterval(updateTimes, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-6xl mx-auto flex justify-center gap-12 sm:gap-16 flex-wrap px-4">
      {Object.entries(times).map(([city, time]) => (
        <div key={city} className="text-center">
          <div className="text-white/80 text-sm font-medium uppercase tracking-wider mb-1">{city}</div>
          <div className="h-0.5 w-8 mx-auto bg-blue-500 mb-2 rounded-full" />
          <div className="text-white text-2xl font-semibold tabular-nums">{time}</div>
        </div>
      ))}
    </div>
  )
}

export default TimezonesDisplay

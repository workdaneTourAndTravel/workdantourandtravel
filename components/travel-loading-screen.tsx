"use client"

import { useEffect, useState } from "react"

interface TravelLoadingScreenProps {
  siteName?: string
}

export default function TravelLoadingScreen({ siteName = 'WORKDANE' }: TravelLoadingScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating clouds */}
        <div className="absolute top-[15%] animate-cloud-1 opacity-20">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
            <path d="M20 45C8.954 45 0 38.284 0 30s8.954-15 20-15c1.1 0 2.18.09 3.23.26C27.57 6.2 37.08 0 48 0c14.36 0 26.14 10.88 27.73 24.88C77.17 25.64 78.56 26 80 26c11.046 0 20 6.716 20 15s-8.954 15-20 15H20z" fill="#93C5FD"/>
          </svg>
        </div>
        <div className="absolute top-[30%] animate-cloud-2 opacity-15">
          <svg width="160" height="80" viewBox="0 0 120 60" fill="none">
            <path d="M20 45C8.954 45 0 38.284 0 30s8.954-15 20-15c1.1 0 2.18.09 3.23.26C27.57 6.2 37.08 0 48 0c14.36 0 26.14 10.88 27.73 24.88C77.17 25.64 78.56 26 80 26c11.046 0 20 6.716 20 15s-8.954 15-20 15H20z" fill="#93C5FD"/>
          </svg>
        </div>

        {/* Dotted flight path */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 600">
          <path
            d="M-50 400 Q200 100 400 300 Q600 500 850 200"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeDasharray="8 8"
            fill="none"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated plane */}
        <div className="mb-8 animate-plane-fly">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="text-blue-500 drop-shadow-lg">
            <path
              d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0011.5 2 1.5 1.5 0 0010 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Globe with rotating ring */}
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-200 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
              <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 12h20" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M4.5 7h15M4.5 17h15" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            </svg>
          </div>
          <div className="absolute -inset-3 border-2 border-blue-300 border-dashed rounded-full animate-spin-slow" />
        </div>

        {/* Brand text */}
        <h2 className="text-2xl font-bold text-blue-600 mb-2 tracking-wide">
          {siteName.split(' ').slice(0, 1).join(' ') || siteName}
        </h2>
        <p className="text-sm text-gray-500 mb-8 tracking-widest uppercase">
          {siteName.split(' ').slice(1).join(' ') || 'Tour and Travel'}
        </p>

        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Loading message */}
        <p className="text-sm text-gray-400 animate-pulse">
          Preparing your journey...
        </p>
      </div>

      <style jsx>{`
        @keyframes cloud-1 {
          0% { transform: translateX(-150px); }
          100% { transform: translateX(calc(100vw + 150px)); }
        }
        @keyframes cloud-2 {
          0% { transform: translateX(calc(100vw + 200px)); }
          100% { transform: translateX(-200px); }
        }
        @keyframes plane-fly {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-cloud-1 {
          animation: cloud-1 20s linear infinite;
        }
        .animate-cloud-2 {
          animation: cloud-2 25s linear infinite;
        }
        .animate-plane-fly {
          animation: plane-fly 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  )
}

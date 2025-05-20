"use client"
import React, { useState, useEffect } from 'react'

const Header: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div 
      className="flex flex-col gap-2 mt-8 rounded-lg h-50 pl-5" 
      style={{ 
        backgroundImage: "url('/images/hero-background.png')", 
        backgroundSize: "cover", 
        backgroundPosition: "center"
      }}
    >
      <h1 className="text-4xl font-bold text-white mt-2">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </h1>
      <p className="text-lg text-gray-300">
        {time.toLocaleDateString(undefined, { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        })}
      </p>
      <div className="mt-2 bg-dark-2 rounded-lg py-4 flex items-center gap-4">
        <span className="text-sm text-gray-400">Upcoming Meeting at: 12:30 PM</span>
      </div>
    </div>
  )
}

export default Header
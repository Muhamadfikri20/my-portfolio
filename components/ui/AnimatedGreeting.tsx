'use client'

import { useState, useEffect } from 'react'

const greetings = [
  { text: 'Hi', lang: 'English' },
  { text: 'Hello', lang: 'English' },
  { text: 'مرحبا', lang: 'Arabic' },
  { text: '你好', lang: 'Chinese' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Hallo', lang: 'German' },
  { text: 'Ciao', lang: 'Italian' },
  { text: 'Olá', lang: 'Portuguese' }
]

export default function AnimatedGreeting() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % greetings.length)
        setIsVisible(true)
      }, 300) // Half of the transition duration
    }, 2500) // Change every 2.5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <span 
      className={`inline-block transition-all duration-500 ease-in-out transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 -translate-y-2 scale-95'
      }`}
    >
      {greetings[currentIndex].text}
    </span>
  )
} 
"use client"

import { useEffect, useState } from 'react'
import LandingPage from '@/components/landingPage'
import LoadingScreen from '@/components/loadingScreen'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 7500)

    return () => clearTimeout(timer)
  }, [])

  return loading ? <LoadingScreen /> : <LandingPage />
}
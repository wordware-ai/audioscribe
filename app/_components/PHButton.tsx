'use client'

import React, { useEffect, useState } from 'react'
import { Sparkle } from '@phosphor-icons/react'

import { Button } from '@/components/ui/button'

const PHButton = () => {
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()

      const launchTime = new Date('2024-07-10T00:00:00-07:00') // Set to July 10th, 2023 at midnight PST

      const diff = launchTime.getTime() - now.getTime()
      console.log('🟣 | file: PHButton.tsx:17 | timer | diff:', diff)

      if (diff <= 0) {
        setCountdown('Launched!')
        clearInterval(timer)
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Button
      size={'lg'}
      variant={'secondary'}
      className="absolute right-2 top-2 bg-[#ff6154] text-white hover:bg-[#ff6154]"
      asChild>
      <a
        href="https://github.com/wordware-ai/audioscribe/"
        target="_blank"
        className="flex-center gap-2 text-center text-sm font-light">
        <Sparkle size={14} />
        Open Source launching
        <br />
        on Product Hunt {countdown && `in ${countdown}`}
      </a>
    </Button>
  )
}

export default PHButton

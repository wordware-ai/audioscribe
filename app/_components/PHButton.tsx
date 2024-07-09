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
    <div className="flex-center absolute right-2 top-2 flex-row gap-1 md:flex-col">
      <a
        href="https://www.producthunt.com/posts/audioscribe-ai-powered-record-to-text?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-audioscribe&#0045;ai&#0045;powered&#0045;record&#0045;to&#0045;text"
        target="_blank">
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=469224&theme=light"
          alt="Audioscribe&#0032;&#0183;&#0032;AI&#0045;powered&#0032;Record&#0045;to&#0045;Text - open&#0045;source&#0032;AI&#0032;agent&#0032;built&#0032;on&#0032;Wordware | Product Hunt"
          style={{ width: '167px', height: '36px' }}
          width="167"
          height="36"
        />
      </a>
      <div className="text-center text-sm text-[#ff6154]">
        Launching Open Source code
        <br />
        {countdown && `in ${countdown}`}
      </div>
    </div>
    // <Button
    //   size={'lg'}
    //   variant={'secondary'}
    //   className="absolute right-2 top-2 bg-[#ff6154] text-white hover:bg-[#ff6154]"
    //   asChild>
    //   <a
    //     href="https://github.com/wordware-ai/audioscribe/"
    //     target="_blank"
    //     className="flex-center gap-2 text-center text-sm font-light">

    //   </a>

    // </Button>
  )
}

export default PHButton

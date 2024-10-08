import React from 'react'
import { DiscordLogo, Envelope, LinkedinLogo, XLogo } from '@phosphor-icons/react/dist/ssr'

import { Button } from '@/components/ui/button'
import WordwareLogo from '@/components/ui/logo'

const Footer = () => {
  return (
    <div className="flex-center w-full flex-col gap-14 bg-[#0E0E0E] px-6 py-14 text-center text-white">
      <WordwareLogo
        color={'white'}
        width={200}
      />
      <div>
        <div className="flex-center flex-col gap-2 md:flex-row md:gap-4">
          <Button
            variant={'ghost'}
            asChild>
            <a
              href="mailto:hello@wordware.ai"
              target="_blank"
              className="flex-center gap-2 text-white">
              <Envelope size={18} />
              Email us
            </a>
          </Button>
          <Button
            variant={'ghost'}
            asChild>
            <a
              href="https://discord.gg/6Zm5FGC2kR"
              target="_blank"
              className="flex-center gap-2 text-white">
              <DiscordLogo size={18} />
              Join Discord
            </a>
          </Button>
          <Button
            variant={'ghost'}
            asChild>
            <a
              href="https://x.com/wordware_ai"
              target="_blank"
              className="flex-center gap-2 text-white">
              <XLogo size={18} />X (fka. Twitter)
            </a>
          </Button>
          <Button
            variant={'ghost'}
            asChild>
            <a
              href="https://www.linkedin.com/company/wordware/"
              target="_blank"
              className="flex-center gap-2 text-white">
              <LinkedinLogo size={18} />
              LinkedIn
            </a>
          </Button>
        </div>
      </div>
      <p className="text-xs">Copyright © 2024 HeyDaily Inc. (dba Wordware)</p>
    </div>
  )
}

export default Footer

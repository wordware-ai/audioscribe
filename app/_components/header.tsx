import React from 'react'

import { Button } from '@/components/ui/button'
import WordwareLogo from '@/components/ui/logo'

import NewNote from '../_audio-recorder/new-note'
import { instrumentSerif } from '../fonts'

const Header = () => {
  return (
    <div className="flex-center flex-grow flex-col gap-6 px-4 pb-6 text-black md:gap-12 md:px-0">
      <h1 className="max-w-lg text-center text-4xl font-bold md:text-5xl">
        Clean notes from
        <br />
        <span
          className={instrumentSerif.className}
          style={{ filter: 'url(#liquify)' }}>
          {' '}
          scrambled thoughts.
        </span>
      </h1>
      <div className="flex-center flex-col gap-2">
        <h2 className="flex-center gap-4">
          Built with{' '}
          <a
            href="https://wordware.ai/"
            target="_blank">
            <WordwareLogo
              color="black"
              width={134}
            />
          </a>
        </h2>
        <Button
          size={'sm'}
          variant={'outline'}
          asChild>
          <a
            href="https://app.wordware.ai/r/a80ab6d8-c7a3-4eee-aaab-10d89cfe53db"
            target="_blank"
            className="flex-center gap-2">
            <WordwareLogo
              emblemOnly
              color={'black'}
              width={12}
            />
            Duplicate this Agent
          </a>
        </Button>
      </div>

      <p className="max-w-md text-center">Messy mind? Just hit record, spell it all out, and we&apos;ll turn all that into a well structured note.</p>
      <div className="flex-center relative w-full max-w-[400px] rounded-3xl border-[0.5px] border-white/30 backdrop-blur-xl md:w-[400px]">
        <div className="z-20 w-full">
          <NewNote />
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 overflow-hidden rounded-3xl">
          <video
            playsInline
            autoPlay
            muted
            loop>
            <source
              src="/aur.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  )
}

export default Header

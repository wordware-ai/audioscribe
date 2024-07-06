import Image from 'next/image'

import { Button } from '@/components/ui/button'
import WordwareLogo from '@/components/ui/logo'
import medium from '@/public/logos/medium.png'
import x from '@/public/logos/x.png'
import ycombinator from '@/public/logos/ycombinator.png'

const logos = [
  {
    image: ycombinator,
    alt: 'YCombinator',
  },
  {
    image: x,
    alt: 'X',
  },
  {
    image: medium,
    alt: 'Medium',
  },
]

const SeenOn = () => {
  return (
    <div className="flex-center flex-col gap-8">
      <div className="flex-center flex-col gap-2">
        <h2 className="text-center text-xs font-bold">As seen on</h2>
        <div className="flex-center flex-rows flex-wrap gap-8 opacity-50 brightness-125 grayscale">
          {logos.map((logo, index) => (
            <Image
              height={20}
              width={logo.alt === 'X' ? 20 : 100}
              src={logo.image}
              alt={logo.alt}
              key={index}
            />
          ))}
        </div>
      </div>
      <div className="flex-center flex-col gap-2 text-sm md:flex-row">
        Want to make your own?
        <Button
          size={'xs'}
          variant={'default'}
          className="px-4"
          asChild>
          <a
            href="https://app.wordware.ai/r/a80ab6d8-c7a3-4eee-aaab-10d89cfe53db"
            target="_blank"
            className="flex-center gap-2 px-2 text-sm">
            <WordwareLogo
              emblemOnly
              color={'white'}
              width={12}
            />
            Duplicate this Agent
          </a>
        </Button>
        and tweak the prompts as needed.
      </div>
    </div>
  )
}

export default SeenOn

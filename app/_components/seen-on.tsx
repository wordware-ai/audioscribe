import Image from 'next/image'

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
  )
}

export default SeenOn

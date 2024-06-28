import techcrunch from '@/public/logos/techcrunch.png'
import ycombinator from '@/public/logos/ycombinator.png'
import medium from '@/public/logos/medium.png'
import Image from 'next/image'

const logos = [
  {
    image: techcrunch,
    alt: 'TechCrunch',
  },
  {
    image: ycombinator,
    alt: 'YCombinator',
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
      <div className="flex-center flex-rows flex-wrap gap-6 opacity-50 brightness-125 grayscale">
        {logos.map((logo, index) => (
          <Image
            width={100}
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

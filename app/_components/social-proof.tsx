import React from 'react'
import Image from 'next/image'
import robert from '@/public/testimonials/robert.jpeg'
import kamil from '@/public/testimonials/kamil.png'
import filip from '@/public/testimonials/filip.jpg'
import { cn } from '@/lib/utils'

const quotes = [
  {
    quote: 'forgot how to type after using this app for a week. might never type anything anymore',
    author: 'Filip Kozera',
    image: filip,
    handle: '@kozerafilip',
    url: 'https://x.com/kozerafilip',
  },
  {
    quote: 'my girlfriend says I talk more to the phone than to her',
    author: 'Kamil Ruczynski',
    image: kamil,
    handle: '@unable0_',
    url: 'https://x.com/unable0_',
  },
  {
    quote: 'people look at me weird when I talk to my phone in the elevator, but I just cannot stop myself',
    author: 'Robert Chandler',
    image: robert,
    handle: '@bertie_ai',
    url: 'https://x.com/bertie_ai',
  },
]

const SocialProof = () => {
  return (
    <div className="flex max-w-6xl flex-col items-center justify-center gap-8 px-4 py-12 sm:flex-row sm:justify-between">
      {quotes.map((testimonial, index) => (
        <div
          key={index}
          //   style={{
          //     transform: index === 0 ? 'perspective(500px) rotateY(14deg)' : index === quotes.length - 1 ? 'perspective(500px) rotateY(-14deg)' : '',
          //   }}
          className={cn(
            'flex w-full flex-col justify-between rounded-lg p-6 sm:w-1/3',
            index === 0 && 'sm:[transform:perspective(500px)_rotateY(14deg)]',
            index === quotes.length - 1 && 'sm:[transform:perspective(500px)_rotateY(-14deg)]',
          )}>
          <p className="mb-4 text-lg">&quot;{testimonial.quote}&quot;</p>
          <div className="flex items-center">
            <Image
              src={testimonial.image}
              alt={testimonial.author}
              width={40}
              height={40}
              className="mr-3 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">{testimonial.author}</p>
              <p className="text-gray-6000 text-sm font-light">
                <a
                  href={testimonial.url}
                  target="_blank"
                  className="transition-all duration-150 hover:underline"
                  rel="noreferrer">
                  {testimonial.handle}
                </a>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SocialProof

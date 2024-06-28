import WordwareLogo from '@/public/wordwarelogo.svg'
import Image from 'next/image'
import DeveloperInfo from './_audio-recorder/developer-info'
import NewNote from './_audio-recorder/new-note'
import Listing from './_components/listing'
import { instrumentSerif } from './fonts'
import SeenOn from './_components/seen-on'
import { NeonGradientCard } from '@/components/ui/neon-gradient-card'
import UseCases from './_components/use-cases'
import SocialProof from './_components/social-proof'
import DotPattern from '@/components/ui/dot-pattern'
import { cn } from '@/lib/utils'
import Footer from './_components/footer'

export const maxDuration = 180
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <DeveloperInfo />
      <DotPattern className={cn('[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]')} />
      <section className="flex-center min-h-[70svh] flex-grow flex-col gap-6 px-4 pb-6 pt-12 text-black md:gap-12 md:px-0">
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
        <h2 className="flex-center gap-4">
          Built with{' '}
          <a
            href="https://wordware.ai/"
            target="_blank">
            <Image
              src={WordwareLogo}
              alt="Wordware Logo"
              height={20}
            />
          </a>
        </h2>
        <p className="max-w-md text-center">Messy mind? Just hit record, spell it all out, and we&apos;ll turn all that into a well structured note.</p>
        <div className="flex-center relative w-full max-w-[400px] rounded-3xl border-[0.5px] border-white/30 backdrop-blur-xl md:w-[400px]">
          {/* <NeonGradientCard borderSize={0}> */}
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
          {/* </NeonGradientCard> */}
        </div>
      </section>
      <section className="pb-12">
        <SeenOn />
      </section>
      <section>
        <Listing />
      </section>
      <section className="pb-12">
        <SocialProof />
      </section>
      <section className="pb-12">
        <UseCases />
      </section>
      <Footer />
      <svg
        width="0"
        height="0">
        <filter id="liquify">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.01 0.01"
            numOctaves="1"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="20"
          />
        </filter>
      </svg>
    </main>
  )
}

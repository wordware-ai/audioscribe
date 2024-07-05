import DotPattern from '@/components/ui/dot-pattern'
import { NewsletterForm } from '@/components/ui/newsletter-form'
import { cn } from '@/lib/utils'

import Callout from './_components/callout'
import DeveloperInfo from './_components/developer-info'
import Footer from './_components/footer'
import Header from './_components/header'
import Listing from './_components/listing'
import SeenOn from './_components/seen-on'
import SocialProof from './_components/social-proof'
import UseCases from './_components/use-cases'

export const maxDuration = 180
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <DeveloperInfo />
      <DotPattern className={cn('-z-50 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]')} />
      <section className="min-h-[70svh] pt-12">
        <Header />
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
      <section className="w-full">
        <Callout />
      </section>
      <section className="pb-24">
        <NewsletterForm />
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

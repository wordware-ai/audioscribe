import Image from 'next/image'
import aurorabg from '@/public/aurora_bg_blue.jpeg'
import { Button } from '@/components/ui/button'
import { DiscordLogo, LinkedinLogo, TwitterLogo } from '@phosphor-icons/react/dist/ssr'
import DotPattern from '@/components/ui/dot-pattern'
import { cn } from '@/lib/utils'
import WordwareLogo from '@/components/ui/logo'

const Callout = () => {
  return (
    <div className="flex-center relative w-full flex-col gap-12 p-4 sm:p-12 md:p-24">
      <div className="max-w-8xl relative flex w-full flex-col items-start gap-6 overflow-hidden rounded-3xl bg-black bg-gradient-to-r p-10 font-light text-white md:flex-row lg:p-16">
        <div className="w-full text-5xl md:w-1/2">Word... what?</div>
        <div className="w-full md:w-1/2">
          <h3 className="mb-4 text-2xl">WORDWARE</h3>
          <p className="mb-6 font-thin">
            It’s a tool (an IDE) that enables you to quickly build custom AI agents for specific use cases like legal, marketing, construction, or even
            generating a Twitter personality as seen here. We call applications built on Wordware ‘WordApps’ because you can create them using natural
            language—in other words, using words (pun intended).
          </p>
          <h3 className="mb-4 text-2xl">WHO IS IT FOR</h3>
          <p className="mb-6 font-thin">
            Most of our clients are cross-functional teams, including less technical members, who need to collaborate with engineers on LLM applications, such
            as assessing prompt outputs, and care about the speed of iterations.
          </p>
          <h3 className="mb-4 text-2xl">WHY</h3>
          <p className="mb-6 font-thin">
            Often, the domain expert—not the engineer—knows what good LLM output looks like. For example, lawyers building legal SaaS need to be deeply involved
            in the process, and working directly in the codebase or going back-and-forth with engineers isn’t the way to go.
          </p>
        </div>
      </div>
      <div className="max-w-8xl relative flex w-full flex-col items-start gap-6 overflow-hidden rounded-3xl bg-stone-300 bg-gradient-to-r p-10 font-light text-black md:flex-row lg:p-16">
        <div className="w-full text-5xl md:w-1/2">I&apos;m technical</div>
        <div className="w-full md:w-1/2">
          <p className="mb-6 font-light">
            Then you’ll appreciate <span className="font-bold">the speed of building complex AI agents without messy LLM abstractions</span>, as well as our
            advanced capabilities like loops, conditional logic (IF-Else), structured generation (JSON mode), and custom code execution, allowing you to connect
            to virtually any API.
          </p>
        </div>
      </div>
      <div className="flex-center gap-2">
        <Button
          size={'lg'}
          variant={'default'}
          asChild>
          <a
            href="https://app.wordware.ai/r/a80ab6d8-c7a3-4eee-aaab-10d89cfe53db"
            target="_blank">
            Duplicate this app
          </a>
        </Button>
        {/* https://app.wordware.ai/r/a80ab6d8-c7a3-4eee-aaab-10d89cfe53db */}
        <Button
          size={'lg'}
          variant={'secondary'}
          asChild>
          <a
            href="https://github.com/ky-zo/wordware-audioscribe"
            target="_blank">
            GitHub repo
          </a>
        </Button>
      </div>

      <DotPattern className={cn('-z-50 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]')} />
    </div>
  )
}

export default Callout

import Image from 'next/image'
import aurorabg from '@/public/aurora_bg_blue.jpeg'
import { Button } from '@/components/ui/button'
import { DiscordLogo, LinkedinLogo, TwitterLogo } from '@phosphor-icons/react/dist/ssr'
import DotPattern from '@/components/ui/dot-pattern'
import { cn } from '@/lib/utils'

const Callout = () => {
  return (
    <div className="flex-center relative w-full p-4 sm:p-12 md:p-24 lg:p-36">
      <div className="flex-center relative min-h-[500px] w-full max-w-4xl flex-col gap-6 overflow-hidden rounded-3xl bg-gradient-to-r p-4 lg:p-12">
        <h3 className="text-center text-4xl font-medium text-white">Built with Wordware.ai</h3>
        <div className="space-y-1 text-center text-xs font-light text-white sm:text-base md:px-6">
          <p className="">This app, like 1000s of others, has been built on Wordware.</p>
          <p>
            It&apos;s an IDE that enables users like you to quickly build your own AI agents for various use cases such as legal, marketing, construction, or
            even generating a Twitter personality as seen here.
          </p>
          <p>
            If you&apos;d like to try, you can sign up here. Also, feel free to shoot us an email describing what you&apos;d like to build at hello@wordware.ai
          </p>
        </div>
        <div className="flex-center flex-col gap-6">
          <div className="flex-center flex-col gap-2 md:flex-row">
            <Button
              size={'lg'}
              variant={'outline'}
              asChild>
              <a
                href="https://wordware.ai"
                target="_blank">
                Visit Wordware.ai
              </a>
            </Button>
            {/* https://app.wordware.ai/r/a80ab6d8-c7a3-4eee-aaab-10d89cfe53db */}
            <Button
              size={'lg'}
              variant={'outline'}
              asChild>
              <a
                href="https://app.wordware.ai/r/a80ab6d8-c7a3-4eee-aaab-10d89cfe53db"
                target="_blank">
                Build your own
              </a>
            </Button>
          </div>
          <div className="flex-center gap-2 text-white">
            <div className="w-full min-w-[20px] border-b border-white" />
            <div className="text-nowrap">or join us on</div>
            <div className="w-full min-w-[20px] border-b border-white" />
          </div>
          <div className="flex-center flex-col gap-4 md:flex-row">
            <Button
              variant={'ghost'}
              asChild>
              <a
                href="https://discord.gg/6Zm5FGC2kR"
                target="_blank"
                className="flex-center gap-2 text-white">
                <DiscordLogo size={18} />
                Discord
              </a>
            </Button>
            <Button
              variant={'ghost'}
              asChild>
              <a
                href="https://x.com/wordware_ai"
                target="_blank"
                className="flex-center gap-2 text-white">
                <TwitterLogo size={18} />
                Twitter
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

        <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-black/10 backdrop-blur-sm" />
        <Image
          quality={80}
          placeholder="blur"
          className="absolute -z-20"
          fill
          src={aurorabg}
          alt={'gradient background'}
        />
        {/* <div className="absolute bottom-0 left-0 right-0 top-0 -z-30 bg-black" /> */}
      </div>
      <DotPattern className={cn('-z-50 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]')} />
    </div>
  )
}

export default Callout

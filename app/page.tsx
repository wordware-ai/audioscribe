import NewNote from './_audio-recorder/new-note'
import { instrumentSerif } from './fonts'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* <div className="absolute -bottom-[30%] left-0 right-0 z-10 ">
        <div className="absolute bg-gradient-to-b from-black to-transparent top-0 h-[30%] left-0 right-0 z-10" />
        <video muted autoPlay loop className=" w-full object-cover ">
          <source src="/aurora.mp4" type="video/mp4" />
        </video>
      </div> */}

      <section className="flex-center flex-grow flex-col gap-12 text-black">
        <h1 className="max-w-lg text-center text-5xl font-bold">
          Clean notes from
          <span
            className={instrumentSerif.className}
            style={{ filter: 'url(#liquify)' }}>
            {' '}
            scrambled thoughts.
          </span>
        </h1>
        <p className="max-w-md text-center">Messy mind? Just hit record, spell it all out, and we&apos;ll turn all that into a well structured note.</p>
        <div className="flex-center h-[200px] w-[400px] rounded-xl border-[0.5px] border-white/30 bg-white/10 backdrop-blur-xl">
          <NewNote />
        </div>
      </section>
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

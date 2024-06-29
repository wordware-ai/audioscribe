'use client'
import { cn } from '@/lib/utils'
import { ArrowDown } from '@phosphor-icons/react'
import Masonry from 'react-masonry-css'
import { useNotes } from '../_hooks/zustand-store'
import NoteCard from './note-card'

const Listing = () => {
  const { notes } = useNotes()

  const breakpointColumnsObj = {
    default: Math.min(notes.length, 3),
    1100: Math.min(notes.length, 2),
    700: 1,
  }

  return (
    <div className={cn('flex-center w-full flex-col gap-6', notes && notes.length > 0 && 'pt-6')}>
      {notes && notes.length > 0 && (
        <div className="flex-center flex-col gap-2">
          <h2 className="text-center text-2xl font-bold">Your notes</h2>
          <ArrowDown size={26} />
        </div>
      )}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="-ml-8 flex w-auto px-4"
        columnClassName="pl-8 bg-clip-padding">
        {notes
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((note) => (
            <div
              className="mb-8"
              key={note.id}>
              <NoteCard {...note} />
            </div>
          ))}
      </Masonry>
    </div>
  )
}

export default Listing

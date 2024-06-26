'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { useMemo, useState } from 'react'
import { lora } from '../fonts'
import { format } from 'date-fns/format'
import { Button } from '@/components/ui/button'
import { WaveSine } from '@phosphor-icons/react/WaveSine'
import { Markdown, MemoizedReactMarkdown } from '@/components/markdown'
import remarkGfm from 'remark-gfm'
import { useNewNote, useNewNoteSteps, useNotes } from '../_hooks/zustand-store'
import { nanoid } from 'nanoid'
import { ArrowDown, QuestionMark, X } from '@phosphor-icons/react'

const Listing = () => {
  const { notes } = useNotes()
  return (
    <div className="flex-center w-full flex-col gap-6">
      {notes && notes.length > 0 && (
        <div className="flex-center flex-col gap-2">
          <h2 className="text-center text-2xl font-bold">Your notes</h2>
          <ArrowDown size={26} />
        </div>
      )}
      <div className="flex-center flex-rows w-full flex-wrap gap-8">
        {notes.map((note) => (
          <NoteCard
            {...note}
            key={note.id}
          />
        ))}
      </div>
    </div>
  )
}

export default Listing

const NoteCard = ({ id, title, content, createdAt }: { id: string; title: string; content: string; createdAt: string }) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const readableDate = format(new Date(createdAt), 'dd MMM yyyy')

  const { setNotes } = useNotes()

  const handleDeleteNote = () => {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    setNotes((notes) => notes.filter((note) => note.id !== id))
  }

  return (
    <div className="group relative min-h-[80px] w-full max-w-sm rounded-lg border-blue-500 bg-blue-50 p-6">
      <div className="absolute -right-2 -top-2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
        <button
          className="flex-center h-6 w-6 rounded-full border border-red-500 bg-white font-bold text-red-500 shadow-sm"
          onClick={() => handleDeleteNote()}>
          {confirmDelete ? <QuestionMark size={12} /> : <X size={12} />}
        </button>
      </div>
      <div className="flex-center flex-col gap-2">
        <h2 className={cn(lora.className, 'w-full text-center text-2xl font-bold')}>{title}</h2>
        <WaveSine width={24} />
        <p className="text-center text-sm">{readableDate}</p>
      </div>
      <div className="w-full py-4">
        <Markdown content={content} />
      </div>
    </div>
  )
}

'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { useMemo, useState } from 'react'
import { lora } from '../fonts'
import { format } from 'date-fns/format'
import { Button } from '@/components/ui/button'
import { WaveSine } from '@phosphor-icons/react/WaveSine'
import { MemoizedReactMarkdown } from '@/components/markdown'
import remarkGfm from 'remark-gfm'
import { useNewNote, useNewNoteSteps, useNotes } from '../_hooks/zustand-store'
import { nanoid } from 'nanoid'

const Listing = () => {
  const { notes } = useNotes()
  return (
    <div className="flex-center flex flex-wrap gap-8">
      {notes.map((note) => (
        <NoteCard
          {...note}
          key={note.id}
        />
      ))}
    </div>
  )
}

export default Listing

const NoteCard = ({ id, title, content, createdAt }: { id: string; title: string; content: string; createdAt: string }) => {
  const readableDate = format(new Date(createdAt), 'dd MMM yyyy')

  const handleDeleteNote = () => {
    alert('not implemented, slow down')
  }

  return (
    <div className="min-h-[80px] w-full max-w-sm rounded-lg border-blue-500 bg-blue-50 p-4">
      <div className="flex-center flex-col gap-2">
        <h2 className={cn(lora.className, 'w-full text-center text-2xl font-bold')}>{title}</h2>
        <WaveSine width={24} />
        <p className="text-center text-sm">{readableDate}</p>
      </div>
      <div className="w-full py-4">
        <MemoizedReactMarkdown
          className={cn(lora.className, 'pros-sm break-words prose-p:leading-relaxed prose-pre:p-0')}
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1
                className="mb-2 text-2xl font-bold last:mb-0"
                {...props}
              />
            ),
            h2: ({ node, ...props }) => (
              <h2
                className="mb-2 text-xl font-bold last:mb-0"
                {...props}
              />
            ),
            h3: ({ node, ...props }) => (
              <h3
                className="mb-2 text-lg font-bold last:mb-0"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p
                className="mb-2 last:mb-0"
                {...props}
              />
            ),
            strong: ({ node, ...props }) => (
              <strong
                className="font-bold"
                {...props}
              />
            ),
          }}>
          {content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  )
}

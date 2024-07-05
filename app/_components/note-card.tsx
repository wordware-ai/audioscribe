'use client'

import { useState } from 'react'
import { ClipboardText, Copy, QuestionMark, X } from '@phosphor-icons/react'
import { WaveSine } from '@phosphor-icons/react/WaveSine'
import { format } from 'date-fns/format'
import { toast } from 'sonner'

import { Markdown } from '@/components/markdown'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { useNotes } from '../_hooks/zustand-store'
import { lora } from '../fonts'

const NoteCard = ({ id, title, transcript, content, createdAt }: { id: string; title: string; transcript: string; content: string; createdAt: string }) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const readableDate = format(new Date(createdAt), 'dd MMM yyyy')

  const { setNotes } = useNotes()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard')
    })
  }

  const handleDeleteNote = () => {
    if (!confirmDelete) {
      setConfirmDelete(true)
      return
    }
    setNotes((notes) => notes.filter((note) => note.id !== id))
  }

  return (
    // Alternatively, we can use gradient for the background: bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50
    <div className="group relative min-h-[80px] w-full max-w-sm rounded-lg border-[0.5px] border-blue-500 bg-blue-50 p-6">
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
      <div className="w-full border-b py-2">
        <div className={cn(lora.className, 'prose-sm break-words prose-p:leading-relaxed prose-pre:p-0')}>“{transcript}”</div>
        <div className="flex w-full justify-end">
          <Button
            variant={'outline'}
            size={'xs'}
            className="flex-center gap-1 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            onClick={() => copyToClipboard(content)}>
            <Copy size={16} />
            <p className="text-xs">Copy</p>
          </Button>
        </div>
      </div>

      <div className="w-full py-4">
        <Markdown content={content} />
        <div className="flex w-full justify-end">
          <Button
            variant={'outline'}
            size={'xs'}
            className="flex-center gap-1 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            onClick={() => copyToClipboard(content)}>
            <Copy size={16} />
            <p className="text-xs">Copy</p>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NoteCard

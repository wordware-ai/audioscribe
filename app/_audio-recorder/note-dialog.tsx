import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
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

const NoteDialog = ({
  defaultOpen,
  title,
  transcript,
  content,
  date,
}: {
  defaultOpen?: boolean
  title?: string | null
  transcript?: string | null
  content?: string | null
  date?: string | null
}) => {
  const [open, setOpen] = useState(defaultOpen)
  const { setNewNote } = useNewNote()
  const { setNewNoteSteps } = useNewNoteSteps()
  const { setNotes } = useNotes()

  const readableDate = useMemo(() => {
    const dialogDate = date ? new Date(date) : new Date()
    return format(dialogDate, 'dd MMM yyyy')
  }, [date])

  const handleDiscardNote = () => {
    setNewNoteSteps(() => ({
      recorded: false,
      uploadStarted: false,
      uploadedURL: null,
      transcriptStarted: false,
      transcript: null,
      wordwareStarted: false,
      streamingStarted: false,
      streamingFinished: false,
      error: null,
    }))
    setNewNote(() => ({
      title: null,
      content: null,
    }))
  }

  const handleSaveNote = () => {
    setNotes((notes) => [
      ...notes,
      { title: title || '', transcript: transcript || '', content: content || '', id: nanoid(5), createdAt: new Date().toISOString() },
    ])
    handleDiscardNote()
  }

  return (
    <AlertDialog
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={(open) => setOpen(open)}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent className="max-h-[90svh] w-full max-w-lg overflow-y-auto">
        <AlertDialogHeader>
          <div className="flex-center flex-col gap-2">
            <h2 className={cn(lora.className, 'w-full text-center text-2xl font-bold')}>{title}</h2>
            <WaveSine width={24} />
            <p className="text-center text-sm">{readableDate}</p>
          </div>
          <div className={cn(lora.className, 'prose-sm break-words border-b py-2 prose-p:leading-relaxed prose-pre:p-0')}>“{transcript}”</div>
          <div className="w-full py-4">
            <Markdown content={content || ''} />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex-center w-full gap-2">
            <Button
              onClick={handleDiscardNote}
              variant="outline">
              Discard Note
            </Button>
            <Button onClick={handleSaveNote}>Save Note</Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default NoteDialog

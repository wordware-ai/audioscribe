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

const NoteDialog = ({ defaultOpen, title, content, date }: { defaultOpen?: boolean; title?: string | null; content?: string | null; date?: string | null }) => {
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
    setNotes((notes) => [...notes, { title: title || '', content: content || '', id: nanoid(5), createdAt: new Date().toISOString() }])
    handleDiscardNote()
  }

  return (
    <AlertDialog
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={(open) => setOpen(open)}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex-center flex-col gap-2">
            <h2 className={cn(lora.className, 'w-full text-center text-2xl font-bold')}>{title}</h2>
            <WaveSine width={24} />
            <p className="text-center text-sm">{readableDate}</p>
          </div>
          <div className="w-full py-4">
            <Markdown content={content || ''} />
            {/* <MemoizedReactMarkdown
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
            </MemoizedReactMarkdown> */}
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

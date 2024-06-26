'use client'

import { Button } from '@/components/ui/button'
import { useNewNote, useNewNoteSteps } from '../_hooks/zustand-store'

const DeveloperInfo = () => {
  const { newNoteSteps, setNewNoteSteps } = useNewNoteSteps()
  const { newNote, setNewNote } = useNewNote()
  return (
    <div className="absolute left-2 top-2 max-w-sm whitespace-pre-wrap text-xs">
      <pre className="whitespace-pre-wrap">{JSON.stringify(newNoteSteps, null, 2)}</pre>
      <pre className="whitespace-pre-wrap">{JSON.stringify(newNote, null, 2)}</pre>
      <Button
        onClick={() => {
          setNewNoteSteps((prev) => ({
            recorded: true,
            uploadStarted: true,
            uploadedURL: 'https://je2yapnzwysjecxl.public.blob.vercel-storage.com/6MO44-hPMRXkTm5qeAH1MUjMD3Xn55OX7yjc.webm',
            transcriptStarted: true,
            transcript: ' This is a test transcripted message.',
            wordwareStarted: true,
            streamingStarted: true,
            streamingFinished: true,
            error: null,
          }))

          setNewNote(() => ({
            title: 'Brief Greeting',
            content: '**Message**: Hello.\n\n###Key Points & Questions: None applicable.\n\n## Next Steps:\n None applicable.',
          }))
        }}>
        Set Dummy data
      </Button>
    </div>
  )
}

export default DeveloperInfo

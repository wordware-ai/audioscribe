'use client'

import { Button } from '@/components/ui/button'
import { useNewNote, useNewNoteSteps, useNotes } from '../_hooks/zustand-store'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

const DeveloperInfo = () => {
  const [open, setOpen] = useState(false)
  const { newNoteSteps, setNewNoteSteps } = useNewNoteSteps()
  const { newNote, setNewNote } = useNewNote()
  const { notes, setNotes } = useNotes()
  return (
    <div className="absolute left-2 top-2 max-w-sm whitespace-pre-wrap text-xs">
      <div className="flex items-center gap-2">
        <Switch
          onCheckedChange={() => setOpen((prev) => !prev)}
          checked={open}
        />{' '}
        Developer info
      </div>

      {open && (
        <>
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
                title: 'App Improvement Tasks',
                transcript: '',
                // content:
                //   '**• Project Description:** Improve and enhance the existing app\n\n**• Task List:**\n\n1. Redesign note display\n   - Implement a grid layout for notes\n   - Align each column to the top\n\n2. Enhance recording feature\n   - Add a "Discard" button\n   - Add a "Retry" button\n\n3. Improve waveform design\n   - Make waveform more reactive to user\'s voice\n   - Change color scheme to fit overall webpage design\n\n4. Consider adding note editing functionality\n   - *Note: May not be necessary for MVP*\n   - *Note: Would require built-in form, potentially complicating the app*\n\n5. Update app styling\n   - Implement blue or green gradients\n\n6. Implement local storage\n   - Ensure notes are not lost on page refresh\n\n7. Conduct mobile compatibility testing\n\n8. Explore AI-generated unique colors or images for notes\n   - *Note: Optional feature for adding a unique touch to the app*',
                content:
                  '  - Ensure notes are not lost on page refresh\n\n7. Conduct mobile compatibility testing\n\n8. Explore AI-generated unique colors or images for notes\n   - *Note: Optional feature for adding a unique touch to the app*',
              }))
            }}>
            Set Dummy data
          </Button>
          <pre className="whitespace-pre-wrap">{JSON.stringify(newNoteSteps, null, 2)}</pre>
          <pre className="whitespace-pre-wrap">{JSON.stringify(newNote, null, 2)}</pre>
          <pre className="whitespace-pre-wrap">{JSON.stringify(notes, null, 2)}</pre>
        </>
      )}
    </div>
  )
}

export default DeveloperInfo

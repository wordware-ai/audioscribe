'use client'

import { CircleNotch } from '@phosphor-icons/react/CircleNotch'

import { useNewNote, useNewNoteSteps } from '../_hooks/zustand-store'
import VoiceRecorder from './components/voice-recorder'
import NoteDialog from './note-dialog'

const NewNote = () => {
  return (
    <div className="flex min-h-[120px] w-full flex-col items-center justify-center space-y-4 rounded-3xl bg-white/20 p-4 text-white backdrop-blur-sm md:min-h-[200px]">
      <Flow />
    </div>
  )
}

export default NewNote

const Flow = () => {
  const { newNoteSteps } = useNewNoteSteps()
  const { newNote } = useNewNote()

  if (newNoteSteps.error) return <VoiceRecorder />
  if (newNoteSteps.streamingStarted)
    return (
      <NoteDialog
        title={newNote.title}
        transcript={newNote.transcript}
        content={newNote.content}
        defaultOpen={true}
      />
    )
  if (newNoteSteps.wordwareStarted) return <LoadingState text={'3/3 Analysing'} />
  if (newNoteSteps.transcriptStarted) return <LoadingState text={'2/3 Transcribing'} />
  if (newNoteSteps.uploadStarted) return <LoadingState text={'1/3 Uploading'} />
  return <VoiceRecorder />
}

const LoadingState = ({ text }: { text: string }) => {
  return (
    <div className="flex-center relative h-full w-full flex-col gap-2">
      <CircleNotch className="h-5 w-5 animate-spin" />
      <p>{text}</p>
    </div>
  )
}

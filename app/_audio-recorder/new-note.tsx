'use client'
import { useNewNote, useNewNoteSteps } from '../_hooks/zustand-store'
import VoiceRecorder from './components/voice-recorder'
import { CircleNotch } from '@phosphor-icons/react/CircleNotch'
import NoteDialog from './note-dialog'

const NewNote = () => {
  return (
    <div className="flex min-h-[200px] w-full max-w-sm flex-col items-center justify-center space-y-4 rounded-lg border bg-gray-100 p-4">
      <Flow />
    </div>
  )
}

export default NewNote

const Flow = () => {
  const { newNoteSteps } = useNewNoteSteps()
  const { newNote } = useNewNote()

  if (newNoteSteps.streamingStarted)
    return (
      <NoteDialog
        title={newNote.title}
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
    <div className="flex-center w-full flex-col gap-2">
      <CircleNotch className="h-5 w-5 animate-spin" />
      <p>{text}</p>
    </div>
  )
}

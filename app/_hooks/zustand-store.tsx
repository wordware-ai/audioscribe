import { create } from 'zustand'

type NewNoteSteps = {
  recorded: boolean
  uploadStarted: boolean
  uploadedURL: string | null
  transcriptStarted: boolean
  transcript: string | null
  wordwareStarted: boolean
  streamingStarted: boolean
  streamingFinished: boolean
  error: string | null
}

export type NewNote = {
  title?: string | null
  content?: string | null
}

type AudioscribeStore = {
  newNoteSteps: NewNoteSteps
  setNewNoteSteps: (updater: (newNoteSteps: NewNoteSteps) => NewNoteSteps) => void

  newNote: NewNote
  setNewNote: (updater: (newNote: NewNote) => NewNote) => void
}

const useStore = create<AudioscribeStore>((set) => ({
  newNoteSteps: {
    recorded: false,
    uploadStarted: false,
    uploadedURL: null,
    transcriptStarted: false,
    transcript: null,
    wordwareStarted: false,
    streamingStarted: false,
    streamingFinished: false,
    error: null,
  },
  setNewNoteSteps: (updater) => set((state) => ({ newNoteSteps: updater(state.newNoteSteps) })),

  newNote: {
    title: null,
    content: null,
  },
  setNewNote: (updater) => set((state) => ({ newNote: updater(state.newNote) })),
}))

export const useNewNoteSteps = () => {
  const newNoteSteps = useStore((state) => state.newNoteSteps)
  const setNewNoteSteps = useStore((state) => state.setNewNoteSteps)
  return { newNoteSteps, setNewNoteSteps }
}

export const useNewNote = () => {
  const newNote = useStore((state) => state.newNote)
  const setNewNote = useStore((state) => state.setNewNote)
  return { newNote, setNewNote }
}

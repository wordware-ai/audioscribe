import { create } from 'zustand'

type Note = {
  id: string
  title: string
  transcript: string
  content: string
  createdAt: string
}

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
  transcript?: string | null
  content?: string | null
}

type AudioscribeStore = {
  newNoteSteps: NewNoteSteps
  setNewNoteSteps: (updater: (newNoteSteps: NewNoteSteps) => NewNoteSteps) => void

  newNote: NewNote
  setNewNote: (updater: (newNote: NewNote) => NewNote) => void

  notes: Note[]
  setNotes: (updater: (notes: Note[]) => Note[]) => void
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

  notes: [],
  setNotes: (updater) => set((state) => ({ notes: updater(state.notes) })),
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

export const useNotes = () => {
  const notes = useStore((state) => state.notes)
  const setNotes = useStore((state) => state.setNotes)
  return { notes, setNotes }
}

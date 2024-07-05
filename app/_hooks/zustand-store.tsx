/**
 * Import necessary modules for creating and persisting the store.
 */
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

/**
 * Define the structure of a Note object.
 * @typedef {Object} Note
 * @property {string} id - The unique identifier of the note.
 * @property {string} title - The title of the note.
 * @property {string} transcript - The transcript of the note.
 * @property {string} content - The content of the note.
 * @property {string} createdAt - The date and time the note was created.
 */
export type Note = {
  id: string
  title: string
  transcript: string
  content: string
  createdAt: string
}

/**
 * Define the structure of the steps for creating a new note.
 * @typedef {Object} NewNoteSteps
 * @property {boolean} recorded - Indicates if the note has been recorded.
 * @property {boolean} uploadStarted - Indicates if the upload process has started.
 * @property {string|null} uploadedURL - The URL of the uploaded note, or null if not uploaded.
 * @property {boolean} transcriptStarted - Indicates if the transcription process has started.
 * @property {string|null} transcript - The transcript of the note, or null if not transcribed.
 * @property {boolean} wordwareStarted - Indicates if the Wordware process has started.
 * @property {boolean} streamingStarted - Indicates if the streaming process has started.
 * @property {boolean} streamingFinished - Indicates if the streaming process has finished.
 * @property {string|null} error - The error message, or null if no error.
 */
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

/**
 * Define the structure of a new note.
 * @typedef {Object} NewNote
 * @property {(string|null)} title - The title of the note, or null if not set.
 * @property {(string|null)} transcript - The transcript of the note, or null if not set.
 * @property {(string|null)} content - The content of the note, or null if not set.
 */
export type NewNote = {
  title?: string | null
  transcript?: string | null
  content?: string | null
}

/**
 * Define the structure of the AudioscribeStore.
 * @typedef {Object} AudioscribeStore
 * @property {NewNoteSteps} newNoteSteps - The steps for creating a new note.
 * @property {(updater: (newNoteSteps: NewNoteSteps) => NewNoteSteps) => void} setNewNoteSteps - Function to update the new note steps.
 * @property {NewNote} newNote - The new note being created.
 * @property {(updater: (newNote: NewNote) => NewNote) => void} setNewNote - Function to update the new note.
 * @property {Note[]} notes - Array of notes.
 * @property {(updater: (notes: Note[]) => Note[]) => void} setNotes - Function to update the notes.
 */
type AudioscribeStore = {
  newNoteSteps: NewNoteSteps
  setNewNoteSteps: (updater: (newNoteSteps: NewNoteSteps) => NewNoteSteps) => void

  newNote: NewNote
  setNewNote: (updater: (newNote: NewNote) => NewNote) => void

  notes: Note[]
  setNotes: (updater: (notes: Note[]) => Note[]) => void
}

/**
 * Create and persist the store.
 */
const useStore = create<AudioscribeStore>()(
  persist(
    (set) => ({
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
    }),
    {
      name: 'audioscribe-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ notes: state.notes }),
    },
  ),
)

/**
 * Hook to use the new note steps.
 * @returns {{ newNoteSteps: NewNoteSteps, setNewNoteSteps: (updater: (newNoteSteps: NewNoteSteps) => NewNoteSteps) => void, resetNewNoteSteps: () => void }}
 */
export const useNewNoteSteps = () => {
  const newNoteSteps = useStore((state) => state.newNoteSteps)
  const setNewNoteSteps = useStore((state) => state.setNewNoteSteps)
  const resetNewNoteSteps = () => {
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
  }
  return { newNoteSteps, setNewNoteSteps, resetNewNoteSteps }
}

/**
 * Hook to use the new note.
 * @returns {{ newNote: NewNote, setNewNote: (updater: (newNote: NewNote) => NewNote) => void, resetNewNote: () => void }}
 */
export const useNewNote = () => {
  const newNote = useStore((state) => state.newNote)
  const setNewNote = useStore((state) => state.setNewNote)
  const resetNewNote = () => {
    setNewNote(() => ({
      title: null,
      transcript: null,
      content: null,
    }))
  }
  return { newNote, setNewNote, resetNewNote }
}

/**
 * Hook to use the notes.
 * @returns {{ notes: Note[], setNotes: (updater: (notes: Note[]) => Note[]) => void }}
 */
export const useNotes = () => {
  const notes = useStore((state) => state.notes)
  const setNotes = useStore((state) => state.setNotes)
  return { notes, setNotes }
}

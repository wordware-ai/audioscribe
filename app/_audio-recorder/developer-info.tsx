'use client'

import { useNewNote, useNewNoteSteps } from '../_hooks/zustand-store'

const DeveloperInfo = () => {
  const { newNoteSteps } = useNewNoteSteps()
  const { newNote } = useNewNote()
  return (
    <div className="absolute left-2 top-2 text-xs">
      <pre className="text-xs">{JSON.stringify(newNoteSteps, null, 2)}</pre>
      <pre className="text-xs">{JSON.stringify(newNote, null, 2)}</pre>
    </div>
  )
}

export default DeveloperInfo

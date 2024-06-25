'use client'
import React, { useState } from 'react'
import VoiceRecorder from './v2/voice-recorder'

const NewNote = () => {
  const [audioBlobURL, setAudioBlobURL] = useState<string | null>(
    'https://je2yapnzwysjecxl.public.blob.vercel-storage.com/Rvj5M-ApSmRbLeg30RMUgt17VUzRdBOSvaiW.webm',
  )

  return (
    <div className="flex min-h-[200px] w-full max-w-sm flex-col items-center justify-center space-y-4 rounded-lg border bg-gray-100 p-4">
      <VoiceRecorder
        audioBlobURL={audioBlobURL}
        setAudioBlobURL={setAudioBlobURL}
      />
    </div>
  )
}

export default NewNote

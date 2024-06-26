'use client'
import React, { useState } from 'react'
import VoiceRecorder from './components/voice-recorder'
import { transcribe } from '../_actions/actions'
import { parsePartialJson } from '@/lib/parse-partial-json'
import { useNewNote, useNewNoteSteps } from '../_hooks/zustand-store'

const NewNote = () => {
  // const [newNoteText, setNewNoteText] = useState<Record<string, string> | null>(null)
  // const [transcript, setTranscript] = useState<string | null>(
  //   // null,
  //   `um, yo, so I talked to jess and we came up with a few new ideas to make the business going. reddit, writing content and maybe finding somebody to test the product, we also want to do affiliates (mainly on youtube) and ads, especially meta ads. for the ads, we need to run three campaigns, one campaign is for capturing the audience and the other one would be for nurturing this audience until they buy. she also said i should run a retargeting but i don't think that's relevant for now`,
  // )
  // const [audioBlobURL, setAudioBlobURL] = useState<string | null>(
  //   // null,
  //   'https://imports.copycopter.ai/53eccfbb-ccc9-44f5-bf51-38b6ae078b23/audio/a22d5ee0-c366-42cc-98f5-255653f5a3cc.mp3',
  // )

  return (
    <div className="flex w-full flex-col justify-center gap-4">
      <div className="flex min-h-[200px] w-full max-w-sm flex-col items-center justify-center space-y-4 rounded-lg border bg-gray-100 p-4">
        <VoiceRecorder />
      </div>
    </div>
  )
}

export default NewNote

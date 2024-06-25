'use client'
import React, { useState } from 'react'
import VoiceRecorder from './components/voice-recorder'
import { transcribe } from '../_actions/actions'
import { z } from 'zod'
import { DeepPartial } from 'ai'
import { parsePartialJson } from '@/lib/parse-partial-json'

const responseSchema = z.record(z.string())
type ResponsePartial = DeepPartial<typeof responseSchema>

const NewNote = () => {
  const [newNoteText, setNewNoteText] = useState<Record<string, string> | null>(null)
  const [transcript, setTranscript] = useState<string | null>(
    // null,
    `In a hidden valley, five extraordinary creatures roamed. The first, a lumina fox, shimmered with a coat of iridescent blues and purples, its tail glowing like the northern lights. Beside it, the flutterfin, a fish with wings of translucent rainbow hues, danced above the crystal-clear river, leaving trails of glittering water droplets. High in the emerald canopy, the sky dancer, a bird with feathers of gold emerald and sapphire, sang melodies that made the leaves quiver. On the forest floor the verdantiga prowled, its fur a vibrant green with streaks of yellow, blending seamlessly with the foliage. Finally, the starlit stag, with antlers that sparkled like constellations, stood majestically under the moonlit sky, its silver fur reflecting the stars. Together, these creatures painted a living tapestry of colour and wonder, a testament to nature's boundless imagination.`,
  )
  const [audioBlobURL, setAudioBlobURL] = useState<string | null>(
    // null,
    'https://imports.copycopter.ai/53eccfbb-ccc9-44f5-bf51-38b6ae078b23/audio/a22d5ee0-c366-42cc-98f5-255653f5a3cc.mp3',
  )

  const handleTranscribe = async () => {
    if (!audioBlobURL) return null
    const { success, text, error } = await transcribe({ publicURL: audioBlobURL })
    if (success) {
      setTranscript(text)
      console.log('🟣 | text', text)
    } else {
      console.log('🔴 | error', error)
    }
  }
  const handleWordware = async () => {
    const response = await fetch('/api/wordware', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transcript }),
    })

    if (!response.body) {
      console.error('No response body')
      return
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let result = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        result += decoder.decode(value, { stream: true })

        const parsed = parsePartialJson(result)
        setNewNoteText(parsed as Record<string, string>)

        // const parsed = responseSchema.parse(result) //this crashes becasue the result is being streamed, so it's not always a valid json.
        //How can I parse an incomplete JSON?
        // console.log('🟣 | file: new-note.tsx:59 | handleWordware | parsed:', parsed)
      }
    } catch (error) {
      console.error('Error reading stream', error)
    } finally {
      reader.releaseLock()
    }
  }

  return (
    <div className="flex w-full flex-col justify-center gap-2">
      <div className="flex min-h-[200px] w-full max-w-sm flex-col items-center justify-center space-y-4 rounded-lg border bg-gray-100 p-4">
        <VoiceRecorder
          audioBlobURL={audioBlobURL}
          setAudioBlobURL={setAudioBlobURL}
        />
        {audioBlobURL && <button onClick={handleTranscribe}>Transcribe</button>}
        {/* {transcript && <p>{transcript}</p>} */}
        {transcript && <button onClick={handleWordware}>Wordware</button>}
      </div>
      {newNoteText && <pre>{JSON.stringify(newNoteText, null, 2)}</pre>}
    </div>
  )
}

export default NewNote

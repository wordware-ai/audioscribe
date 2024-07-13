'use server'

import { createClient } from '@deepgram/sdk'
import Replicate from 'replicate'

const replicate = new Replicate()

type IncrediblyFastWhisperOutput = {
  text: string
  chunks: {
    timestamp: [number, number]
    text: string
  }[]
}

export const transcribe = async ({ publicURL }: { publicURL: string }) => {
  try {
    const output = (await replicate.run('vaibhavs10/incredibly-fast-whisper:3ab86df6c8f54c11309d4d1f930ac292bad43ace52d10c80d87eb258b3c9f79c', {
      input: {
        audio: publicURL,
        batch_size: 24,
        task: 'transcribe',
        timestamp: 'chunk',
      },
    })) as IncrediblyFastWhisperOutput

    const text = output.text

    return { success: true, text: text }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, text: null, error: error.message }
    }
    return { success: false, text: null, error: 'Unknown error' }
  }
}

type OpenAIWhisperOutput = {
  transcription: string
}

export const transcribeWhisper = async ({ publicURL }: { publicURL: string }) => {
  console.log('🟣 | file: actions.tsx:42 | transcribeWhisper | publicURL:', publicURL)
  try {
    const output = (await replicate.run('openai/whisper:4d50797290df275329f202e48c76360b3f22b08d28c196cbc54600319435f8d2', {
      input: {
        audio: publicURL,
        model: 'large-v3',
        translate: false,
        temperature: 0,
        transcription: 'plain text',
        suppress_tokens: '-1',
        logprob_threshold: -1,
        no_speech_threshold: 0.6,
        condition_on_previous_text: true,
        compression_ratio_threshold: 2.4,
        temperature_increment_on_fallback: 0.2,
      },
    })) as OpenAIWhisperOutput
    console.log('🟣 | file: actions.tsx:58 | transcribeWhisper | output:', output)

    return { success: true, text: output.transcription }
  } catch (error) {
    console.log('🟣 | file: actions.tsx:63 | transcribeWhisper | error:', error)
    if (error instanceof Error) {
      return { success: false, text: null, error: error.message }
    }
    return { success: false, text: null, error: 'Unknown error' }
  }
}

export const transcribeDeepgram = async ({ publicURL }: { publicURL: string }) => {
  console.log('🟣 | file: actions.tsx:42 | transcribeWhisper | publicURL:', publicURL)
  try {
    // STEP 1: Create a Deepgram client using the API key
    const deepgram = createClient(process.env.DEEPGRAM_API_KEY)

    // STEP 2: Call the transcribeUrl method with the audio payload and options
    const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
      {
        url: publicURL,
      },
      // STEP 3: Configure Deepgram options for audio analysis
      {
        model: 'nova-2',
        smart_format: true,
      },
    )

    if (error) throw error
    // STEP 4: Print the results

    return { success: true, text: result.results.channels[0].alternatives[0].transcript }
  } catch (error) {
    console.log('🟣 | file: actions.tsx:63 | transcribeWhisper | error:', error)
    if (error instanceof Error) {
      return { success: false, text: null, error: error.message }
    }
    return { success: false, text: null, error: 'Unknown error' }
  }
}

export const createLoopsContact = async ({ email }: { email: string }) => {
  const options = {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.LOOPS_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      source: 'audioscribe',
      subscribed: true,
    }),
  }

  try {
    const response = await fetch('https://app.loops.so/api/v1/contacts/create', options)
    const data = await response.json()

    return { success: true }
  } catch (error) {
    return { success: false, error: error }
  }
}

import { useCallback, useEffect, useRef, useState } from 'react'

import { transcribeWhisper } from '@/app/_actions/actions'
import { NewNote, useNewNote, useNewNoteSteps } from '@/app/_hooks/zustand-store'
import { parsePartialJson } from '@/lib/parse-partial-json'

/**
 * useAudioRecorder hook provides functionality for recording, processing, and analyzing audio.
 * It handles the entire lifecycle of recording, including setting up the audio context, media recorder,
 * and analyser for visualizing the audio waveform. It also processes the recorded audio by uploading
 * it to a server, transcribing it, and analyzing the transcript.
 *
 * @returns An object containing the state of the recording process and functions to control it.
 */
const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false) // Indicates if recording is in progress
  const [recordingTime, setRecordingTime] = useState(0) // Keeps track of the recording time in seconds
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null) // Reference to the recording timer
  const [audioData, setAudioData] = useState<number[]>([]) // Array of audio data for visualization
  const mediaRecorderRef = useRef<MediaRecorder | null>(null) // Reference to the MediaRecorder instance
  const chunksRef = useRef<Blob[]>([]) // Array to store the recorded audio chunks
  const audioContextRef = useRef<AudioContext | null>(null) // Reference to the AudioContext instance
  const analyserRef = useRef<AnalyserNode | null>(null) // Reference to the AnalyserNode instance
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null) // Reference to the MediaStreamAudioSourceNode instance
  const animationRef = useRef<number | null>(null) // Reference to the animation frame
  const [autoStopTimer, setAutoStopTimer] = useState<number | null>(null) // Timer for auto-stopping the recording
  const { setNewNoteSteps, resetNewNoteSteps } = useNewNoteSteps() // Hook for managing new note steps
  const { setNewNote, resetNewNote } = useNewNote() // Hook for managing the new note

  useEffect(() => {
    // Cleanup function to stop the recording timer when the component unmounts
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
    }
  }, [])

  /**
   * Uploads a blob to the server and returns the URL of the uploaded file.
   *
   * @param blob The blob to be uploaded.
   * @returns A promise that resolves to the URL of the uploaded file.
   */
  const uploadBlob = async (blob: Blob) => {
    try {
      const formData = new FormData()
      formData.append('file', blob)
      const response = await fetch('/api/upload', {
        method: 'PUT',
        body: formData,
      })
      return (await response.json()) as string
    } catch (err) {
      setNewNoteSteps((state) => ({ ...state, error: 'Error uploading recording. Please try again.' }))
      console.error('Error uploading recording:', err)
    }
  }

  /**
   * Transcribes the audio file using the Replicate API.
   *
   * @param audioPublicURL The URL of the audio file to be transcribed.
   * @returns A promise that resolves to the transcribed text or null if transcription fails.
   */
  const transcribeAudio = async ({ audioPublicURL }: { audioPublicURL: string }) => {
    console.log('🟣 | file: use-recorder.tsx:67 | transcribeAudio | audioPublicURL:', audioPublicURL)
    if (!audioPublicURL) return null
    const { success, text, error } = await transcribeWhisper({ publicURL: audioPublicURL })
    console.log('🟣 | file: use-recorder.tsx:72 | transcribeAudio | success:', success)
    console.log('🟣 | file: use-recorder.tsx:73 | transcribeAudio | text:', text)
    console.log('🟣 | file: use-recorder.tsx:74 | transcribeAudio | error:', error)

    if (success) {
      setNewNoteSteps((state) => ({ ...state, transcript: text }))
      return text
    } else {
      console.error('🔴 | transcribeAudioError', error)
    }
  }

  /**
   * Analyzes the transcript using the Wordware API.
   *
   * @param transcript The transcript to be analyzed.
   * @returns A promise that resolves to the analyzed note.
   */
  const analyseVoicenote = async ({ transcript }: { transcript: string }) => {
    setNewNoteSteps((state) => ({ ...state, wordwareStarted: true }))
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

    setNewNoteSteps((state) => ({ ...state, streamingStarted: true }))

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        result += decoder.decode(value, { stream: true })

        const parsed = parsePartialJson(result)
        setNewNote(() => parsed as NewNote)
      }
    } catch (error) {
      console.error('Error reading stream', error)
    } finally {
      reader.releaseLock()
      setNewNoteSteps((state) => ({ ...state, streamingFinished: true }))
      return parsePartialJson(result) as NewNote
    }
  }

  /**
   * Processes the recorded audio by uploading, transcribing, and analyzing it.
   */
  const processRecording = useCallback(async () => {
    // This is the controller that handles all the logic behind creating a new note.

    const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
    setNewNoteSteps((state) => ({ ...state, recorded: true, uploadStarted: true }))
    // STEP 1: Upload blob to Vercel
    const url = await uploadBlob(blob)
    if (!url) {
      setNewNoteSteps((state) => ({ ...state, error: 'Error uploading the Blob' }))
      return
    }

    // STEP 2: Transcribe the blob using Replicate
    setNewNoteSteps((state) => ({ ...state, uploadedURL: url, transcriptStarted: true }))
    const transcript = await transcribeAudio({ audioPublicURL: url })
    console.log('🟣 | file: use-recorder.tsx:142 | processRecording | transcript:', transcript)

    if (!transcript) {
      setNewNoteSteps((state) => ({ ...state, error: 'Error transcribing audio. Please try again.' }))
      return
    }

    //Step 3: Analyse the transcript
    await analyseVoicenote({ transcript })

    chunksRef.current = []
  }, [setNewNoteSteps])

  /**
   * Stops the recording process and optionally processes the recording.
   *
   * @param shouldProcess If true, the recording will be processed after stopping.
   */
  const stopRecording = useCallback(
    (shouldProcess: boolean = true) => {
      if (mediaRecorderRef.current && isRecording) {
        if (!shouldProcess) {
          mediaRecorderRef.current.onstop = null
        } else {
          mediaRecorderRef.current.onstop = processRecording
        }
        mediaRecorderRef.current.stop()
        if (shouldProcess) {
        }
        if (sourceRef.current) {
          sourceRef.current.disconnect()
        }
        if (audioContextRef.current) {
          audioContextRef.current.close()
        }
        setIsRecording(false)
        if (recordingTimerRef.current) {
          clearInterval(recordingTimerRef.current)
          recordingTimerRef.current = null
        }
      }
    },
    [isRecording, processRecording],
  )

  /**
   * Resets the recording state and cleans up resources.
   */
  const resetRecording = useCallback(() => {
    stopRecording(false)
    setIsRecording(false)
    setRecordingTime(0)
    setAudioData([])
    chunksRef.current = []
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect()
      sourceRef.current = null
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    if (analyserRef.current) {
      analyserRef.current = null
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null
    }
    resetNewNoteSteps()
    resetNewNote()
  }, [resetNewNoteSteps, resetNewNote])

  /**
   * Starts the recording process.
   */
  const startRecording = useCallback(async () => {
    try {
      // Request access to the users' mic
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      // Create a recorder to record the stream

      //LAST MINUTE CHANGE - Replicate started throwing:
      //Error: Prediction failed: 'duration'
      //so I changed the format to mp4.
      //Seems to be working fine now.
      const mimeType = MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : 'audio/webm'

      const options = {
        mimeType,

        //
        // mimeType: 'audio/webm;codecs=opus',

        // Safari does not seem to support bitsPerSecond
        // bitsPerSecond: 24000, // Set to 24 kbps
      }

      mediaRecorderRef.current = new MediaRecorder(stream, options)
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      analyserRef.current = audioContextRef.current.createAnalyser()
      // Create a MediaStreamAudioSourceNode to connect the audio stream to the AudioContext
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream)
      // Connect the source to the analyser to analyze the audio data
      sourceRef.current.connect(analyserRef.current)

      // Setting the Fast Fourier Transform (FFT) size for the analyser to 256,
      // which divides the signal into frequency bins for analysis,
      // allowing us to visualize the audio frequency spectrum
      analyserRef.current.fftSize = 256
      const bufferLength = analyserRef.current.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      const updateAudioData = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray)
          setAudioData(Array.from(dataArray))
          animationRef.current = requestAnimationFrame(updateAudioData)
        }
      }
      updateAudioData()

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }
      mediaRecorderRef.current.onstop = processRecording
      mediaRecorderRef.current.start()
      setIsRecording(true)
      setRecordingTime(0)
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1)
      }, 1000)
    } catch (err) {
      setNewNoteSteps((state) => ({ ...state, error: 'Error accessing microphone. Please check permissions.' }))
      console.error('🔴 | Error starting recording:', err)
    }
  }, [setNewNoteSteps, stopRecording])

  useEffect(() => {
    if (isRecording && autoStopTimer === null) {
      const timerId = window.setTimeout(() => {
        stopRecording(true)
      }, 152000)
      setAutoStopTimer(timerId)
    }
    return () => {
      if (autoStopTimer !== null) {
        clearTimeout(autoStopTimer)
      }
    }
  }, [isRecording, stopRecording])

  return { isRecording, audioData, startRecording, stopRecording, recordingTime, resetRecording }
}

export default useAudioRecorder

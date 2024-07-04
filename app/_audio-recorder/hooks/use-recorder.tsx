import { transcribeWhisper } from '@/app/_actions/actions'
import { NewNote, useNewNote, useNewNoteSteps } from '@/app/_hooks/zustand-store'
import { parsePartialJson } from '@/lib/parse-partial-json'
import { useState, useRef, useCallback, useEffect } from 'react'

const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [audioData, setAudioData] = useState<number[]>([])
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const animationRef = useRef<number | null>(null)
  const [autoStopTimer, setAutoStopTimer] = useState<number | null>(null)
  const { setNewNoteSteps, resetNewNoteSteps } = useNewNoteSteps()
  const { setNewNote, resetNewNote } = useNewNote()

  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
    }
  }, [])

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

  const transcribeAudio = async ({ audioPublicURL }: { audioPublicURL: string }) => {
    if (!audioPublicURL) return null
    const { success, text, error } = await transcribeWhisper({ publicURL: audioPublicURL })
    console.log('🟣 | file: use-recorder.tsx:47 | transcribeAudio | success:', success)
    if (success) {
      console.log('🟣 | file: use-recorder.tsx:49 | transcribeAudio | success:', success)
      console.log('🟢 | transcribeAudioText:', text)
      setNewNoteSteps((state) => ({ ...state, transcript: text }))

      return text
    } else {
      console.error('🔴 | transcribeAudioError', error)
    }
  }

  const analyseVoicenote = async ({ transcript }: { transcript: string }) => {
    console.log('🟣 | file: use-recorder.tsx:114 | processRecording | transcript:', transcript)
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

  const processRecording = useCallback(async () => {
    // This is the controller that handles all the logic behind creating a new note.
    console.log('🟣 processRecording')
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
    console.log('🟣 | file: use-recorder.tsx:114 | processRecording | transcript:', transcript)
    if (!transcript) {
      setNewNoteSteps((state) => ({ ...state, error: 'Error transcribing audio. Please try again.' }))
      return
    }

    //Step 3: Analyse the transcript
    const newNote = await analyseVoicenote({ transcript })
    console.log('🟣 | processRecording | newNote:', newNote)
    chunksRef.current = []
  }, [setNewNoteSteps])

  const stopRecording = useCallback(
    (shouldProcess: boolean = true) => {
      console.log('🟣 | stopRecording')
      console.log('shouldProcess', shouldProcess)
      if (mediaRecorderRef.current && isRecording) {
        if (!shouldProcess) {
          console.log('null shouldProcess')
          mediaRecorderRef.current.onstop = null
        } else {
          console.log('processRecording shouldProcess')
          mediaRecorderRef.current.onstop = processRecording
        }
        mediaRecorderRef.current.stop()
        if (shouldProcess) {
          console.log('processRecording shouldProcess')
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

  const startRecording = useCallback(async () => {
    try {
      // Request access to the users' mic
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      // Create a recorder to record the stream
      mediaRecorderRef.current = new MediaRecorder(stream)
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
        console.log('Auto-stopping recording after 2:02')
        stopRecording(true)
      }, 122000)
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

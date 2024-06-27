import { transcribe } from '@/app/_actions/actions'
import { NewNote, useNewNote, useNewNoteSteps } from '@/app/_hooks/zustand-store'
import { parsePartialJson } from '@/lib/parse-partial-json'
import { useState, useRef, useCallback, useEffect } from 'react'

// const useAudioRecorder = (setAudioBlobURL: (url: string) => void, setError: (error: string) => void) => {
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
    const { success, text, error } = await transcribe({ publicURL: audioPublicURL })
    if (success) {
      setNewNoteSteps((state) => ({ ...state, transcript: text }))
      console.log('🟢 | transcribeAudioText:', text)
      return text
    } else {
      console.error('🔴 | transcribeAudioError', error)
    }
  }

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

  const processRecording = useCallback(async () => {
    console.log('🟣 | processRecording')
    const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
    setNewNoteSteps((state) => ({ ...state, recorded: true, uploadStarted: true }))
    const url = await uploadBlob(blob)
    if (url) {
      setNewNoteSteps((state) => ({ ...state, uploadedURL: url, transcriptStarted: true }))
      const transcript = await transcribeAudio({ audioPublicURL: url })
      if (!transcript) {
        setNewNoteSteps((state) => ({ ...state, error: 'Error transcribing audio. Please try again.' }))
      } else {
        const newNote = await analyseVoicenote({ transcript })
        console.log('🟣 | processRecording | newNote:', newNote)
      }
    }
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
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      analyserRef.current = audioContextRef.current.createAnalyser()
      sourceRef.current = audioContextRef.current.createMediaStreamSource(stream)
      sourceRef.current.connect(analyserRef.current)

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
      // mediaRecorderRef.current.onstop = processRecording
      mediaRecorderRef.current.start()
      setIsRecording(true)
      setRecordingTime(0)
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => {
          console.log('🟣 | recordingTimerRef.current', prevTime)
          if (prevTime >= 5) {
            console.log('stop recording:')
            stopRecording(true)
            return prevTime
          }
          return prevTime + 1
        })
      }, 1000)
    } catch (err) {
      setNewNoteSteps((state) => ({ ...state, error: 'Error accessing microphone. Please check permissions.' }))
      console.error('🔴 | Error starting recording:', err)
    }
  }, [setNewNoteSteps, stopRecording])

  return { isRecording, audioData, startRecording, stopRecording, recordingTime, resetRecording }
}

export default useAudioRecorder

import { transcribe } from '@/app/_actions/actions'
import { NewNote, useNewNote, useNewNoteSteps } from '@/app/_hooks/zustand-store'
import { parsePartialJson } from '@/lib/parse-partial-json'
import { useState, useRef, useCallback } from 'react'

// const useAudioRecorder = (setAudioBlobURL: (url: string) => void, setError: (error: string) => void) => {
const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [audioData, setAudioData] = useState<number[]>([])
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const animationRef = useRef<number | null>(null)
  const { setNewNoteSteps } = useNewNoteSteps()
  const { setNewNote } = useNewNote()

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
      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setNewNoteSteps((state) => ({ ...state, recorded: true }))
        setNewNoteSteps((state) => ({ ...state, uploadStarted: true }))
        const url = await uploadBlob(blob)
        if (url) {
          // setAudioBlobURL(url)
          setNewNoteSteps((state) => ({ ...state, uploadedURL: url }))
          setNewNoteSteps((state) => ({ ...state, transcriptStarted: true }))
          const transcript = await transcribeAudio({ audioPublicURL: url })
          if (!transcript) {
            setNewNoteSteps((state) => ({ ...state, error: 'Error transcribing audio. Please try again.' }))
          } else {
            const newNote = await analyseVoicenote({ transcript })
            console.log('🟣 | file: use-recorder.tsx:58 | mediaRecorderRef.current.onstop= | newNote:', newNote)
            // setNewNote(newNote)
          }
        }
        chunksRef.current = []
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (err) {
      setNewNoteSteps((state) => ({ ...state, error: 'Error accessing microphone. Please check permissions.' }))
      console.error('🔴 | Error starting recording:', err)
    }
  }, [setNewNoteSteps])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      if (sourceRef.current) {
        sourceRef.current.disconnect()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      setIsRecording(false)
    }
  }, [isRecording])

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

  return { isRecording, audioData, startRecording, stopRecording }
}

export default useAudioRecorder

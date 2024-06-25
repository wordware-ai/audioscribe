import { useState, useRef, useCallback } from 'react'

const useAudioRecorder = (setAudioBlobURL: (url: string) => void, setError: (error: string) => void) => {
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [audioData, setAudioData] = useState<number[]>([])
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const animationRef = useRef<number | null>(null)

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
        const url = await uploadBlob(blob)
        if (url) {
          setAudioBlobURL(url)
        }
        chunksRef.current = []
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (err) {
      setError('Error accessing microphone. Please check permissions.')
      console.error('Error starting recording:', err)
    }
  }, [setAudioBlobURL, setError])

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
      setError('Error uploading recording. Please try again.')
      console.error('Error uploading recording:', err)
    }
  }

  return { isRecording, audioData, startRecording, stopRecording }
}

export default useAudioRecorder

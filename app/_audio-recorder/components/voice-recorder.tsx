'use client'

import { useState } from 'react'
import RecordButton from './record-button'
import AudioWaveform from './audio-waveform'
import AudioPlayer from './audio-player'
import ErrorAlert from './error-alert'
import useAudioRecorder from '../hooks/use-recorder'

const VoiceRecorder = ({ audioBlobURL, setAudioBlobURL }: { audioBlobURL: string | null; setAudioBlobURL: (url: string) => void }) => {
  const [error, setError] = useState<string | null>(null)
  const { isRecording, audioData, startRecording, stopRecording } = useAudioRecorder(setAudioBlobURL, setError)

  return (
    <div className="flex space-x-2">
      {!audioBlobURL && (
        <RecordButton
          isRecording={isRecording}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
        />
      )}

      <ErrorAlert error={error} />

      <AudioPlayer audioBlobURL={audioBlobURL} />

      {isRecording && <AudioWaveform audioData={audioData} />}
    </div>
  )
}

export default VoiceRecorder

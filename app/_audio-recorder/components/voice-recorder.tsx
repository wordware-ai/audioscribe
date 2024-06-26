'use client'

import RecordButton from './record-button'
import AudioWaveform from './audio-waveform'
import AudioPlayer from './audio-player'
import ErrorAlert from './error-alert'
import useAudioRecorder from '../hooks/use-recorder'
import { useNewNoteSteps } from '@/app/_hooks/zustand-store'

const VoiceRecorder = () => {
  const { newNoteSteps } = useNewNoteSteps()
  const { isRecording, audioData, startRecording, stopRecording } = useAudioRecorder()

  return (
    <div className="flex space-x-2">
      {!newNoteSteps.recorded && (
        <RecordButton
          isRecording={isRecording}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
        />
      )}

      <ErrorAlert error={newNoteSteps.error} />

      <AudioPlayer audioBlobURL={newNoteSteps.uploadedURL} />

      {isRecording && <AudioWaveform audioData={audioData} />}
    </div>
  )
}

export default VoiceRecorder

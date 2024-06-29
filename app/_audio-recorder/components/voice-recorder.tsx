'use client'

import RecordButton from './record-button'
import AudioWaveform from './audio-waveform'
import AudioPlayer from './audio-player'
import ErrorAlert from './error-alert'
import useAudioRecorder from '../hooks/use-recorder'
import { useNewNoteSteps } from '@/app/_hooks/zustand-store'
import RecordingControls from './recording-controls'

const VoiceRecorder = () => {
  const { newNoteSteps } = useNewNoteSteps()
  const { isRecording, audioData, startRecording, stopRecording, recordingTime, resetRecording } = useAudioRecorder()

  return (
    <div className="flex space-x-2">
      {!newNoteSteps.recorded && (
        <RecordButton
          isRecording={isRecording}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
        />
      )}

      {newNoteSteps.error ? (
        <ErrorAlert error={newNoteSteps.error} />
      ) : (
        <>
          <AudioPlayer audioBlobURL={newNoteSteps.uploadedURL} />

          <div className="flex-center flex-col gap-2">
            {isRecording && (
              <RecordingControls
                recordingTime={recordingTime}
                onResetRecording={resetRecording}
              />
            )}
            {isRecording && <AudioWaveform audioData={audioData} />}
          </div>
        </>
      )}
    </div>
  )
}

export default VoiceRecorder

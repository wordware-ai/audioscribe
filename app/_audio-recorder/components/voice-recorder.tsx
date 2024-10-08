'use client'

import { useNewNoteSteps } from '@/app/_hooks/zustand-store'

import useAudioRecorder from '../hooks/use-recorder'
import AudioPlayer from './audio-player'
import AudioWaveform from './audio-waveform'
import ErrorAlert from './error-alert'
import RecordButton from './record-button'
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

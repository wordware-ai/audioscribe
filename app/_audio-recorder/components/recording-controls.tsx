import { ArrowCounterClockwise } from '@phosphor-icons/react'

import { lora } from '@/app/fonts'
import { cn } from '@/lib/utils'

const RecordingControls = ({ recordingTime, onResetRecording }: { recordingTime: number; onResetRecording: () => void }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className={cn(lora.className, 'flex-center gap-2 text-sm text-white')}>
      <button onClick={onResetRecording}>
        <ArrowCounterClockwise color="white" />
      </button>
      <span className="text-xl">{formatTime(recordingTime)}</span> / 2:00
    </div>
  )
}

export default RecordingControls

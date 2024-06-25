import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Mic, Square } from 'lucide-react'

const RecordButton = ({
  isRecording,
  onStartRecording,
  onStopRecording,
}: {
  isRecording: boolean
  onStartRecording: () => void
  onStopRecording: () => void
}) => (
  <Button
    onClick={isRecording ? onStopRecording : onStartRecording}
    className={cn(
      'absolute h-16 w-16 rounded-full border text-white shadow-[5px_5px_30px_rgba(190,190,190,0.3),-5px_-5px_30px_rgba(255,255,255,0.3)] transition-all duration-150 hover:bg-white',
      isRecording ? '-bottom-8 left-1/2 -translate-x-1/2' : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white',
    )}>
    {isRecording ? <Square className="" /> : <Mic color="black" />}
  </Button>
)

export default RecordButton

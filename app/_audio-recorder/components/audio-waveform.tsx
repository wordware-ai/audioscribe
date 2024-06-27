const AudioWaveform = ({ audioData }: { audioData: number[] }) => {
  if (audioData.length === 0) return null

  const height = 64
  const width = 320
  const middleY = height / 2

  // Normalize and smooth the audio data
  const normalizedData = normalizeAndSmoothData(audioData, 0.1)

  const points = normalizedData
    .map((value, index) => {
      const x = (index / normalizedData.length) * width
      const y = middleY - value * (height / 2)
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}>
      {/* <line
        x1="0"
        y1={middleY}
        x2={width}
        y2={middleY}
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1"
      /> */}
      <path
        d={`M0,${middleY} ${points}`}
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Helper function to normalize and smooth the data
function normalizeAndSmoothData(data: number[], smoothingFactor: number): number[] {
  const maxValue = Math.max(...data.map(Math.abs))
  const normalized = data.map((value) => value / maxValue)

  let smoothed = normalized.map((value, index, array) => {
    if (index === 0) return value
    return value * smoothingFactor + array[index - 1] * (1 - smoothingFactor)
  })

  // Center the waveform
  const average = smoothed.reduce((sum, value) => sum + value, 0) / smoothed.length
  smoothed = smoothed.map((value) => value - average)

  return smoothed
}

export default AudioWaveform

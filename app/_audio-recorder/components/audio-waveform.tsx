const AudioWaveform = ({ audioData }: { audioData: number[] }) => {
  if (audioData.length === 0) return null

  const height = 64
  const width = 320
  const points = audioData
    .map((value, index) => {
      const x = (index / audioData.length) * width
      const y = (value / 255) * height
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}>
      <polyline
        points={points}
        fill="none"
        stroke="lime"
        strokeWidth="2"
      />
    </svg>
  )
}

export default AudioWaveform

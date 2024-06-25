const AudioPlayer = ({ audioBlobURL }: { audioBlobURL: string | null }) => {
  if (!audioBlobURL) return null

  return (
    <audio
      controls
      src={audioBlobURL}
      className="mt-4"
    />
  )
}

export default AudioPlayer

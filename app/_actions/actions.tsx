'use server'
import Replicate from 'replicate'
const replicate = new Replicate()

type Output = {
  text: string
  chunks: {
    timestamp: [number, number]
    text: string
  }[]
}

export const transcribe = async ({ publicURL }: { publicURL: string }) => {
  try {
    const output = (await replicate.run('vaibhavs10/incredibly-fast-whisper:3ab86df6c8f54c11309d4d1f930ac292bad43ace52d10c80d87eb258b3c9f79c', {
      input: {
        audio: publicURL,
        batch_size: 24,
        task: 'transcribe',
        timestamp: 'chunk',
      },
    })) as Output

    const text = output.text

    return { success: true, text: text }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, text: null, error: error.message }
    }
    return { success: false, text: null, error: 'Unknown error' }
  }
}

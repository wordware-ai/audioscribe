import { put } from '@vercel/blob'
import { nanoid } from 'nanoid'

export const runtime = 'edge'

export async function PUT(request: Request) {
  const form = await request.formData()

  const file = form.get('file') as File | null
  const filename = `${nanoid(5)}.webm`

  if (filename && file) {
    const { url } = await put(filename, file, { access: 'public' })

    return Response.json(url)
  }

  return Response.json({ error: 'No filename or body' })
}

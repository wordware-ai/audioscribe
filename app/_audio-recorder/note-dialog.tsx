import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useMemo, useState } from 'react'
import { lora } from '../fonts'
import { format } from 'date-fns/format'
import { Button } from '@/components/ui/button'
import { WaveSine } from '@phosphor-icons/react/WaveSine'
import { MemoizedReactMarkdown } from '@/components/markdown'
import remarkGfm from 'remark-gfm'

const NoteDialog = ({ defaultOpen, title, content, date }: { defaultOpen?: boolean; title?: string | null; content?: string | null; date?: string | null }) => {
  const [open, setOpen] = useState(defaultOpen)
  const readableDate = useMemo(() => {
    const dialogDate = date ? new Date(date) : new Date()
    return format(dialogDate, 'dd MMM yyyy')
  }, [date])

  return (
    <Dialog
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex-center flex-col gap-2">
            <h2 className={cn(lora.className, 'w-full text-center text-2xl font-bold')}>{title}</h2>
            <WaveSine width={24} />
            <p className="text-center text-sm">{readableDate}</p>
          </div>
          <MemoizedReactMarkdown
            className={cn(lora.className, 'prose break-words prose-p:leading-relaxed prose-pre:p-0')}
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="mb-2 text-2xl font-bold last:mb-0"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="mb-2 text-xl font-bold last:mb-0"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="mb-2 text-lg font-bold last:mb-0"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="mb-2 last:mb-0"
                  {...props}
                />
              ),
              strong: ({ node, ...props }) => (
                <strong
                  className="font-bold"
                  {...props}
                />
              ),
              // h1({ children }) {
              //   return <h1 className="mb-2 last:mb-0">{children}</h1>
              // },
              // h2({ children }) {
              //   return <h2 className="mb-2 last:mb-0">{children}</h2>
              // },
              // h3({ children }) {
              //   return <h3 className="mb-2 last:mb-0">{children}</h3>
              // },
              // p({ children }) {
              //   return <p className="mb-2 last:mb-0">{children}</p>
              // },
            }}>
            {content}
          </MemoizedReactMarkdown>
          {/* <ReactMarkdown className={cn(lora.className, 'prose')}>{content}</ReactMarkdown> */}
          {/* 
          This component is not correctly parsing the headings and bolding. How can I fix that?
          
          ##Message: Hello.\n\n###Key Points & Questions: None applicable.\n\nNext Steps: None applicable."
          
          */}
        </DialogHeader>
        <div className="flex-center w-full gap-2">
          <Button variant="outline">Discard Note</Button>
          <Button>Save Note</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NoteDialog

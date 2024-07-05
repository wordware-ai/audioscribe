import { Brain, CheckSquare, EnvelopeSimple, Heart, Kanban, Lightbulb, MicrophoneStage, PenNib, ShareNetwork } from '@phosphor-icons/react/dist/ssr'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import { lora } from '../fonts'

const useCases = [
  {
    icon: Kanban,
    title: 'Project write-up',
    description: `Transform scattered thoughts into coherent project plans. Speak your ideas, we'll structure them.`,
  },
  {
    icon: Brain,
    title: 'Brainstorming',
    description: `Unleash your creativity without boundaries. Record your brainstorm, we'll organize the chaos.`,
  },
  {
    icon: EnvelopeSimple,
    title: 'Email',
    description: `Dictate emails on-the-go. We'll polish your words into professional correspondence.`,
  },
  {
    icon: Heart,
    title: 'Personal message',
    description: `Pour your heart out verbally. We'll craft it into a thoughtful, articulate message.`,
  },
  {
    icon: PenNib,
    title: 'Journal',
    description: `Speak your day's experiences. We'll transform them into reflective journal entries.`,
  },
  {
    icon: CheckSquare,
    title: 'Task planning',
    description: `Voice your to-dos as they come. We'll organize them into an actionable task list.`,
  },
  {
    icon: MicrophoneStage,
    title: 'Interview',
    description: `Focus on the conversation. We'll turn your recording into structured interview notes.`,
  },
  {
    icon: ShareNetwork,
    title: 'Social media post',
    description: `Share your thoughts aloud. We'll shape them into engaging social media content.`,
  },
  {
    icon: Lightbulb,
    title: 'Idea generation',
    description: `Let your ideas flow freely. We'll capture and organize your creative sparks.`,
  },
]

const UseCases = () => {
  return (
    <div className="container mx-auto space-y-4 px-4">
      <h2 className="text-center text-2xl font-bold">Best for</h2>
      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {useCases.map((useCase, index) => (
          <Card
            key={index}
            className="bg-white">
            <CardContent className="flex h-full flex-col items-start p-4">
              <div className="mb-2 flex items-center">
                <span className="mr-2">
                  <useCase.icon />
                </span>
                <h3 className={cn('font-semibold', lora.className)}>{useCase.title}</h3>
              </div>
              <p className="p-2 text-sm font-light text-muted-foreground">{useCase.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default UseCases

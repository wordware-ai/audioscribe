'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { createLoopsContact } from '@/app/_actions/actions'

const FormSchema = z.object({
  email: z.string().email(),
})

export function NewsletterForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const { success, error } = await createLoopsContact({ email: values.email })
    if (!success) {
      toast.error('Something went wrong')
    } else {
      toast.success('You have been added to the newsletter.')
    }
  }

  return (
    <div className="flex-center container mx-auto flex-col space-y-4 px-4">
      <h2 className="text-center text-2xl font-bold">Sign up for the newsletter</h2>
      <p>If you’d like to get notified about our upcoming project or exploring different WordApps, leave your email here.</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex-center gap-2">
                    <Input
                      disabled={form.formState.isSubmitting || form.formState.isSubmitSuccessful}
                      className="max-w-[400px] rounded-full"
                      placeholder="your@email.com"
                      {...field}
                    />
                    <Button
                      className="min-w-[120px]"
                      disabled={form.formState.isSubmitting || form.formState.isSubmitSuccessful}
                      type="submit">
                      {form.formState.isSubmitting ? 'Submitting...' : form.formState.isSubmitSuccessful ? 'Subscribed' : 'Sign up'}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

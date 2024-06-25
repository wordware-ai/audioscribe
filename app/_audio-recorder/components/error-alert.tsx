import { Alert, AlertDescription } from '@/components/ui/alert'

const ErrorAlert = ({ error }: { error: string | null }) => {
  if (!error) return null

  return (
    <Alert variant="destructive">
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )
}

export default ErrorAlert

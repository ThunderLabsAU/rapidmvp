import { Alert, AlertDescription, AlertTitle } from "./alert";

export function ErrorMessage({ error }: { error: any }) {
  if (!error) {
    return null;
  }
  return (
    <Alert variant="destructive">
      <AlertTitle>Sorry, there was a problem</AlertTitle>
      <AlertDescription>{error.message ?? error}</AlertDescription>
    </Alert>
  );
}

import * as React from "react";
import { ActionButton } from "./action-button";
import { Button } from "./button";
import { ErrorMessage } from "./error-message";

interface Props {
  error: any | null;
  isPending: boolean;
  onSubmit?: () => unknown;
  onCancel: () => unknown;
  submitLabel?: string;
  cancelLabel?: string;
}

export const FormActions = ({
  error,
  isPending,
  onSubmit,
  onCancel,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
}: Props) => {
  return (
    <>
      <ErrorMessage error={error} />
      <div className="flex gap-2 mt-8">
        <ActionButton
          type={onSubmit ? "button" : "submit"}
          isBusy={isPending}
          onClick={onSubmit}
        >
          {submitLabel}
        </ActionButton>
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={onCancel}
        >
          {cancelLabel}
        </Button>
      </div>
    </>
  );
};

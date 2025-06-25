import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "./button";

interface Props extends ButtonProps {
  isBusy?: boolean;
}

export function ActionButton(props: Props) {
  const { isBusy, children, disabled, ...rest } = props;
  return (
    <Button {...rest} disabled={disabled || isBusy}>
      {isBusy && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}

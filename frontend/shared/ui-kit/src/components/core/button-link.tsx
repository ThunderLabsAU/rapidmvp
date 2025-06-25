import { Link, type LinkProps } from "@tanstack/react-router";
import { Button, type ButtonProps } from "./button";

export const ButtonLink = ({ children, ...props }: ButtonProps & LinkProps) => {
  return (
    <Button asChild {...props}>
      <Link to={props.to}>{children}</Link>
    </Button>
  );
};

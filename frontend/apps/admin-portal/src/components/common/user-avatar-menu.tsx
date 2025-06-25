import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, AvatarFallback } from "@repo/ui-kit/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui-kit/components/ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

export function UserAvatarMenu() {
  const { logout, user } = useAuth0();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const doLogout = async () => {
    await logout();
    navigate({ to: "/" });
  };

  const name =
    user.name ||
    [user.given_name, user.family_name].filter(Boolean).join(" ") ||
    user.email ||
    "";

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-black">{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            {user.email !== name && (
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => doLogout()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

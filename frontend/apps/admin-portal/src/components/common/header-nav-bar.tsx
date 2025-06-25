import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui-kit/components/core/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@repo/ui-kit/components/core/navigation-menu";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDownIcon, SettingsIcon } from "lucide-react";
import { UserAvatarMenu } from "./user-avatar-menu";

export const HeaderNavBar = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user } = useAuth0();

  const isActive = (path: string, exact: boolean = false) =>
    exact ? pathname === path : pathname.startsWith(path);

  return (
    <div className="fixed top-0 w-full border-b bg-white z-10 bg-brand-blue">
      <div className="flex h-16 items-center px-8 justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center justify-center h-[40px]">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
          <span className="text-xl font-semibold">RapidMVP Admin</span>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  active={isActive("/users")}
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link to="/users">Users</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={
                      navigationMenuTriggerStyle() + " flex items-center gap-2"
                    }
                  >
                    <SettingsIcon className="w-4 h-4" /> Settings
                    <ChevronDownIcon className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>todo</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {user && <UserAvatarMenu />}
        </div>
      </div>
    </div>
  );
};

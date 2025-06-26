import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui-kit/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@repo/ui-kit/components/ui/navigation-menu";
import { Link, useRouterState, type LinkProps } from "@tanstack/react-router";
import { ChevronDownIcon, SettingsIcon } from "lucide-react";
import { UserAvatarMenu } from "./user-avatar-menu";

export const HeaderNavBar = () => {
  const { user } = useAuth0();

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
              <NavItem to="/things">Things</NavItem>
              <NavItem to="/users">Users</NavItem>
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

const NavItem = ({
  to,
  children,
  exact = false,
}: {
  to: LinkProps["to"];
  children: React.ReactNode;
  exact?: boolean;
}) => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (path: LinkProps["to"], exact: boolean = false) => {
    if (exact) {
      return pathname === path;
    }
    return pathname.startsWith(path?.toString() ?? "");
  };

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        active={isActive(to, exact)}
        className={navigationMenuTriggerStyle()}
        asChild
      >
        <Link to={to}>{children}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

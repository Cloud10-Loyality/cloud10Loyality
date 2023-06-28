import { Logout, Profile, User } from "@/components/ui/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import React from "react";

export const ProfileDropdown = React.forwardRef(
  ({ handleLogout }: any, ref) => {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <div className="flex items-center gap-2 relative">
                <div className="cursor-pointer">
                  <Profile />
                </div>
                <span>Hi, Ritesh</span>
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="flex bg-muted flex-col items-center justify-center p-2">
              <div
                onClick={handleLogout}
                className="flex p-2 px-3 hover:rounded-lg hover:bg-background cursor-pointer min-w-[120px] items-center justify-center gap-2"
              >
                <span>
                  <Logout />
                </span>
                <span>Logout</span>
              </div>
              <Separator className="my-2" />
              <div
                onClick={handleLogout}
                className="flex p-2 px-3 hover:rounded-lg hover:bg-background cursor-pointer min-w-[120px] items-center justify-center gap-2"
              >
                <span>
                  <User />
                </span>
                <span>Profile</span>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }
);

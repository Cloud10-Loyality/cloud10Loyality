import { Logout, Profile, User } from "@/components/ui/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { ManagerType } from "../../../../types";
import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

type Props = {
  handleLogout: () => void;
  loading: boolean;
  manager?: Partial<ManagerType>;
};

export const ProfileDropdown = React.forwardRef(
  ({ handleLogout, loading, manager }: Props, ref) => {
    const router = useRouter();
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <div className="flex items-center gap-2 relative">
                <div className="cursor-pointer">
                  <Profile />
                </div>
                <span>
                  Hi,{" "}
                  {loading ? (
                    <span className="h-4 w-4 bg-muted animate-pulse">
                      &nbsp;
                    </span>
                  ) : (
                    manager?.name?.split(" ")[0]
                  )}
                </span>
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="flex bg-muted flex-col items-center justify-center p-2">
              <div
                onClick={handleLogout}
                className="flex p-2 px-3 hover:rounded-lg hover:bg-background cursor-pointer min-w-[120px] items-center justify-center gap-2"
              >
                <span>
                  {loading ? (
                    <ReloadIcon className="h-4 w-4 animate-spin" />
                  ) : (
                    <Logout />
                  )}
                </span>
                <span>Logout</span>
              </div>
              <Separator className="my-2" />
              <div
                onClick={() => router.push("/app/profile")}
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

ProfileDropdown.displayName = "ProfileDropdown";

"use client";

import {
  Bell,
  DownIcon,
  Logout,
  Profile,
  Support,
  User,
} from "@/components/ui/icons";
import React, { useState } from "react";

import Image from "next/image";
import { ThemeChanger } from "@/components/ui/theme";
import logo from "./../../../../public/assets/logo.png";
import logo_light from "./../../../../public/assets/logo-dark.png";
import { logout } from "@/redux/slices/authSlice";
import { useDispatch } from "@/redux/store";
import { ChevronsUpDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu/NavigationMenu";
import { Separator } from "@/components/ui/separator";

type Props = {};

export default function Header({}: Props) {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());

  const handleDropdown = () => setDropdown((prev) => !prev);

  return (
    <div className="h-[10vh] sticky px-6 top-0 bg-muted left-0 py-2">
      <div className="flex items-center h-full justify-between px-4 rounded-lg bg-opacity-40">
        <div className="hidden dark:block w-[70px]">
          <Image
            src={logo}
            alt="Logo of manager site"
            width={100}
            height={100}
          />
        </div>
        <div className="dark:hidden w-[70px]">
          <Image
            src={logo_light}
            alt="Logo of manager site"
            width={100}
            height={100}
          />
        </div>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            <div className="cursor-pointer">
              <Support />
            </div>
            <div className="cursor-pointer">
              <Bell />
            </div>
            <ThemeChanger />
          </div>
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line react/display-name
const ProfileDropdown = React.forwardRef(
  ({ handleLogout, closeDropdown }: any, ref) => {
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
      // <Dropdown ref={ref} closeDropdown={closeDropdown}>
      // <div
      //   onClick={handleLogout}
      //   className="flex hover:bg-secondary-light p-2 px-3 rounded-lg cursor-pointer dark:hover:bg-secondary-dark items-center justify-between"
      // >
      //   <span>
      //     <Logout />
      //   </span>
      //   <span>Logout</span>
      // </div>
      // <div
      //   onClick={handleLogout}
      //   className="flex hover:bg-secondary-light p-2 px-3 rounded-lg cursor-pointer dark:hover:bg-secondary-dark items-center justify-between"
      // >
      //   <span>
      //     <User />
      //   </span>
      //   <span>Profile</span>
      // </div>
      // </Dropdown>
    );
  }
);

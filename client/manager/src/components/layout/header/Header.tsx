"use client";

import { Bell, Support, User } from "@/components/ui/icons";
import React, { useState } from "react";

import Image from "next/image";
import { ThemeChanger } from "@/components/ui/theme";
import logo from "./../../../../public/assets/logo.png";
import logo_light from "./../../../../public/assets/logo-dark.png";
import { logout } from "@/redux/slices/authSlice";
import { useDispatch } from "@/redux/store";
import { ProfileDropdown } from "./profile-dropdown";

type Props = {};

export default function Header({}: Props) {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());

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

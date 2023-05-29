import { Bell, DownIcon, Profile, Support } from "@/components/ui/icons";
import { ThemeChanger } from "@/components/ui/theme";
import logo from "./../../../../public/assets/logo.png";
import React from "react";
import Image from "next/image";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="h-[10vh] sticky mr-6 top-0 left-0 py-2">
      <div className="flex items-center h-full justify-between px-4 rounded-lg bg-gray-300 dark:bg-sidebar bg-opacity-40">
        <div className="flex justify-center w-[70px]">
          <Image
            src={logo}
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
          <div className="flex items-center gap-2">
            <div className="cursor-pointer">
              <Profile />
            </div>
            <span>Hi, Ritesh</span>
            <div className="cursor-pointer">
              <DownIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

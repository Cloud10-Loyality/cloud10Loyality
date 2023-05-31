"use client";

import {
  Bell,
  DownIcon,
  Logout,
  Profile,
  Support,
  User,
} from "@/components/ui/icons";
import { ThemeChanger } from "@/components/ui/theme";
import logo from "./../../../../public/assets/logo.png";
import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import Dropdown from "@/components/ui/dropdown/Dropdown";
import { UpIcon } from "@/components/ui/icons";

type Props = {};

export default function Header({}: Props) {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());

  const handleDropdown = () => setDropdown((prev) => !prev);

  const showDropdownIcon = () =>
    dropdown ? (
      <UpIcon onClick={handleDropdown} />
    ) : (
      <DownIcon onClick={handleDropdown} />
    );

  return (
    <div className="h-[10vh] sticky mr-6 top-0 left-0 py-2">
      <div className="flex items-center h-full justify-between px-4 rounded-lg bg-primary-light dark:bg-primary-dark bg-opacity-40">
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
          <div className="flex items-center gap-2 relative">
            <div className="cursor-pointer">
              <Profile />
            </div>
            <span>Hi, Ritesh</span>
            <div className="cursor-pointer">{showDropdownIcon()}</div>
            {dropdown && (
              <ProfileDropdown
                handleLogout={handleLogout}
                ref={dropdownRef}
                closeDropdown={() => setDropdown(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line react/display-name
const ProfileDropdown = React.forwardRef(
  ({ handleLogout, closeDropdown }: any, ref) => {
    return (
      <Dropdown ref={ref} closeDropdown={closeDropdown}>
        <div
          onClick={handleLogout}
          className="flex hover:bg-secondary-light p-2 px-3 rounded-lg cursor-pointer dark:hover:bg-secondary-dark items-center justify-between"
        >
          <span>
            <Logout />
          </span>
          <span>Logout</span>
        </div>
        <div
          onClick={handleLogout}
          className="flex hover:bg-secondary-light p-2 px-3 rounded-lg cursor-pointer dark:hover:bg-secondary-dark items-center justify-between"
        >
          <span>
            <User />
          </span>
          <span>Profile</span>
        </div>
      </Dropdown>
    );
  }
);

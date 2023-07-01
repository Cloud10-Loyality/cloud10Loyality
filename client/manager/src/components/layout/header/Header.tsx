"use client";

import { Bell, Support, User } from "@/components/ui/icons";
import React, { useState } from "react";

import Image from "next/image";
import { ThemeChanger } from "@/components/ui/theme";
import logo from "./../../../../public/assets/logo.png";
import logo_light from "./../../../../public/assets/logo-dark.png";
import {
  logout as deleteAccessToken,
  setLoading,
} from "@/redux/slices/authSlice";
import { RootState, useDispatch, useSelector } from "@/redux/store";
import { ProfileDropdown } from "./profile-dropdown";
import axios from "axios";
import { useAuth } from "@/libs/hooks/use-auth";
import { toast } from "react-toastify";

type Props = {};

export default function Header({}: Props) {
  const { accessToken, authLoading, manager } = useSelector(
    (state: RootState) => state.authReducer
  );
  const dispatch = useDispatch();
  const { logout } = useAuth();

  const handleLogout = async () => {
    const res = await logout();

    if (res.error) {
      toast(res.message || "Logout failed, please try again", {
        type: "error",
      });
      return;
    }

    toast(res.message || "Logout successful, redirecting to login...", {
      type: "success",
    });
    dispatch(deleteAccessToken());
  };

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
          <div>
            <ProfileDropdown
              manager={manager}
              handleLogout={handleLogout}
              loading={authLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

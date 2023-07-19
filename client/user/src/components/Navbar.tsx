"use client";

import { ArrowRight, Bell, LogOut, Settings, User2 } from "lucide-react";
import { DarkMode, Profile } from "./ui/icons";
import { useEffect, useRef, useState } from "react";

import { BsArrowRight } from "react-icons/bs";
import { Button } from "./ui/button";
import { FiLogOut } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { ThemeChanger } from "@/components/ui/theme";
import { menuData } from "../utils/Constant";
import { usePathname } from "next/navigation";

// import { IoMdNotifications, IoMdSettings } from "react-icons/io";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const pathName = usePathname();
  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowNotification(!showNotification);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setShowNotification(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle search submit logic here
    console.log("Search submitted:", searchText);
  };

  const getActiveLabel = () => {
    const currentPath = pathName;
    if (currentPath === "/app/profile") {
      return "Profile";
    } else if (currentPath === "/app/settings") {
      return "Settings";
    } else {
      const activeItem = menuData.find((item) => item.link === currentPath);
      return activeItem ? activeItem.label : "";
    }
  };

  const isSearchDisabled = true; // Set this to true to disable the search button and input
  const isNotificationDisabled = true; // Set this to true to disable the notification button
  const isSettingsDisabled = true; // Set this to true to disable the settings button

  return (
    <>
      <div className="h-[10vh] bg-muted px-6 sticky top-0 left-0 py-2 ">
        <div className="flex items-center px-4 h-full rounded-lg justify-between bg-opacity-40">
          <div className="p-[10px] font-semibold bg-background rounded-md">
            <span className="flex items-center space-x-3 pr-3">
              <ArrowRight size={20} />
              <span className="sm:text-sm ">{getActiveLabel()}</span>
            </span>
          </div>
          {/* <div className="mt-5  ml-6">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search"
                className={`py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isSearchDisabled ? "cursor-not-allowed " : ""
                }`}
                disabled={isSearchDisabled}
              />
              <button
                type="submit"
                className={`ml-1 py-2 px-3 text-lg bg-blue-500 rounded-md text-white ${
                  isSearchDisabled ? "cursor-not-allowed " : ""
                }`}
                disabled={isSearchDisabled}
              >
                <FiSearch className="h-5 w-5" />
              </button>
            </form>
          </div> */}

          <div className="flex items-center gap-4">
            {/* <div ref={notificationRef}> */}
            <Button
              variant="outline"
              disabled={isNotificationDisabled}
              onClick={handleClick}
            >
              <Bell size={20} />
            </Button>

            {/* {showNotification && ( */}
            {/* <div className="absolute  ml-[-170px] bottom-[-100%]  p-4 bg-white text-black rounded-md shadow-md"> */}
            {/* Content of the notification */}
            {/* This is a notification message. */}
            {/* <button
                className="text-sm mt-2 underline"
                onClick={handleClick}
                >
                Close
              </button> */}
            {/* </div> */}
            {/* )} */}
            {/* </div> */}
            <Button variant="outline" disabled={isSettingsDisabled}>
              <Settings size={20} />
            </Button>
            {/* <div className="bg-muted text-lg rounded-md"> */}
            <Link href="/app/profile" className="text-xl">
              <Button variant="outline">
                <User2 size={20} />
              </Button>
            </Link>
            {/* </div> */}
            <div className="cursor-pointer bg-muted text-lg rounded-md">
              <ThemeChanger />
            </div>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut size={20} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

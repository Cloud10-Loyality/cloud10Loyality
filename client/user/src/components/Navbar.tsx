"use client";

import { FiSearch } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";
import { ThemeChanger } from "@/components/ui/theme";
import { DarkMode } from "./ui/icons";

export default function Navbar() {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle search submit logic here
    console.log("Search submitted:", searchText);
  };

  return (
    <>
      <div className="w-full h-[15vh] bg-[#ECF0FB] ">
        <div className="flex flex-row  h-16 ml-3">
          <div className="mt-5 p-3  ml-2 bg-white rounded-md">
            <span className="flex items-center space-x-3 pr-3">
              <BsArrowRight />
              <span>User Profile</span>
            </span>
          </div>
          <div className="mt-5  ml-6">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search"
                className="py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="mt-0 h-13 p-2 bg-blue-500 rounded-md text-white"
              >
                <FiSearch />
              </button>
            </form>
          </div>
          <div className="mt-5 p-3 ml-16 bg-white text-lg rounded-md">
            <button className="text-xl">
              <IoMdNotifications />
            </button>
          </div>
          <div className="mt-5 p-3  ml-6 bg-white text-lg rounded-md">
            <button className="text-xl">
              <IoMdSettings />
            </button>
          </div>
          <div className="mt-5 p-3  ml-6 bg-white text-lg rounded-md">
            <Link href="/profile" className="text-xl">
              <BsFillPersonFill />
            </Link>
          </div>
          <div className="mt-5 p-3 cursor-pointer ml-6 bg-white text-lg rounded-md"></div>
          <div className="mt-5 p-3  ml-11 bg-red-300 rounded-md">
            <button>
              <span className="flex items-center space-x-3 pr-3">
                <FiLogOut />
                <span>Logout</span>
              </span>
            </button>
            {/* <DarkMode /> */}
          </div>
          <div>
            {/* <DarkMode /> */}
            <ThemeChanger />
          </div>
        </div>
      </div>
    </>
  );
}

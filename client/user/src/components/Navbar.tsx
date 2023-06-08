"use client";
import { FiSearch } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { IoMdNotifications, IoMdSettings } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";
import { ThemeChanger } from "@/components/ui/theme";
import { DarkMode, Profile, Settings } from "./ui/icons";
import { usePathname } from "next/navigation";
import { menuData } from "../utils/Constant";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const pathName = usePathname();

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
    const activeItem = menuData.find((item) => item.link === currentPath);
    return activeItem ? activeItem.label : "";
  };

  return (
    <>
      <div className="h-[10vh] sticky mr-6 top-0 left-0 py-2 ">
        <div className="flex items-center h-full px-4 rounded-lg justify-between bg-opacity-40">
          <div className="mt-5  p-[10px]  ml-2 dark:bg-[#33383e] bg-white rounded-md">
            <span className="flex items-center space-x-3 pr-3">
              <BsArrowRight />
              <span className="sm:text-sm ">{getActiveLabel()}</span>
            </span>
          </div>
          <div className="mt-5  ml-6">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search"
                className="py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="ml-1 py-2 px-3 text-lg bg-blue-500 rounded-md text-white"
              >
                <FiSearch className="h-5 w-5" />
              </button>
            </form>
          </div>

          <div className="ml-3 mt-5 flex  ">
            <div className="pt-[7px] px-[11px]  ml-16 bg-white text-lg rounded-md dark:text-black">
              <button className="text-xl">
                <IoMdNotifications />
              </button>
            </div>
            <div className=" pt-[7px] px-[11px]   ml-6 bg-white text-lg rounded-md dark:text-black">
              <button className="text-xl">
                <Settings />
              </button>
            </div>
            <div className=" pt-[7px] px-[11px]   ml-6 bg-white text-lg rounded-md dark:text-black">
              <Link href="/app/profile" className="text-xl">
                <Profile />
              </Link>
            </div>
            <div className=" pt-[7px] px-[11px]  cursor-pointer ml-6 bg-white text-lg rounded-md dark:text-black">
              <ThemeChanger />
            </div>
            <div className="pt-[7px] px-[11px] ml-32 bg-red-300 rounded-md flex items-center justify-center">
              <span className="flex items-center space-x-3 pr-3 dark:text-black">
                <FiLogOut />
                <span className="mt-[-4px]">Logout</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

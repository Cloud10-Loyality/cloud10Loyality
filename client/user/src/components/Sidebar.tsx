"use client";

import { useState } from "react";
import { menuData } from "@/utils/Constant";
import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Menu } from "./ui/icons";

type Props = {};

export const Sidebar = (props: Props) => {
  const [isNavShowing, setIsNavShowing] = useState(false);

  const segment = useSelectedLayoutSegment();

  const toggleSidebar = () => {
    setIsNavShowing(!isNavShowing);
  };

  return (
    <>
      <div
        className={`h-full row-span-3 px-6 text-black ${
          isNavShowing ? "min-w-[250px]" : "w-max"
        } row-span-2  bg-gray-50 dark:bg-sidebar dark:text-white relative`}
      >
        <div className="cursor-pointer text-lg flex  px-2 place-items-center h-[10vh] relative">
          <button onClick={toggleSidebar}>
            <Menu />
          </button>
        </div>
        <ul className="flex flex-col space-y-3 mt-4">
          {menuData.map((menuItem) => (
            <li
              key={menuItem.id}
              className="hover:bg-[#5d94b4] px-2 hover:text-white w-full rounded-md py-2"
            >
              <Link href={menuItem.link}>
                <span className="flex items-center space-x-3 ">
                  <span>{menuItem.icon}</span>
                  {isNavShowing && <span>{menuItem.label}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

"use client";

import { useState } from "react";
import { menuData } from "@/utils/Constatnt";
import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

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
        className={`h-full row-span-2  text-black ${
          isNavShowing ? "min-w-[250px]" : "w-max"
        } row-span-2  bg-gray-50 dark:bg-sidebar relative`}
      >
        <div className="cursor-pointer px-7 flex place-items-center h-[10vh] relative">
          <AiOutlineMenu onClick={toggleSidebar} />
        </div>
        <ul className="flex flex-col space-y-3 pl-8 pr-9 ">
          {menuData.map((menuItem) => (
            <li
              key={menuItem.id}
              className="hover:bg-blue-600 hover:text-white rounded-md py-2"
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

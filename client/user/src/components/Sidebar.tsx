"use client"

import { useState } from "react";
import { menuData } from "@/utils/Constatnt";
import { AiOutlineMenu } from "react-icons/ai"
import Link from "next/link";

type Props = {};

export const Sidebar = (props: Props) => {
  const [isNavShowing, setISNavShowing] = useState(false);
  return (
    <>
      <div className="h-screen bg-[#384884] text-white ">
        <div className="p-9">
          <h1 className="text-xl font-bold mb-2 ">Sidebar</h1>
        </div>
        <div className="cursor-pointer relative" onClick={() => setISNavShowing(false)}  >
          <AiOutlineMenu/>
        </div>
        <ul className="flex flex-col space-y-3 pl-8 pr-9">
          {menuData.map((menuItem) => (
            <li key={menuItem.id} className="hover:bg-blue-950 rounded-md py-2">
              <Link href={menuItem.link}>
                <span className="flex items-center space-x-3">
                  {menuItem.icon}
                  <span>{menuItem.label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

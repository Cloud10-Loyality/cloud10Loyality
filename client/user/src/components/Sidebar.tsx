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
  const [hoveredIcon, setHoveredIcon] = useState("");

  const segment = useSelectedLayoutSegment();

  const toggleSidebar = () => {
    setIsNavShowing(!isNavShowing);
  };

  const handleIconHover = (iconName: string) => {
    setHoveredIcon(iconName);
  };

  const handleIconLeave = () => {
    setHoveredIcon("");
  };

  return (
    <>
      <div
        className={`h-full row-span-3 px-6 text-black ${isNavShowing ? "min-w-[250px]" : "w-max"
          } row-span-2 bg-gray-50 dark:bg-sidebar dark:text-white relative`}
      >
        <div className="cursor-pointer text-lg flex px-2 place-items-center h-[10vh] relative">
          <button onClick={toggleSidebar}>
            <Menu />
          </button>
        </div>
        <ul className="flex flex-col space-y-3 mt-4">
          {menuData.map((menuItem) => (
            <li
              key={menuItem.id}
              className="hover:bg-blue-500 px-2 hover:text-white w-full rounded-md py-2"
            >
              <Link href={menuItem.link}>
                <span
                  className="flex items-center space-x-3 relative"
                  onMouseEnter={() => handleIconHover(menuItem.label)}
                  onMouseLeave={handleIconLeave}
                >
                  <span>{menuItem.icon}</span>
                  {isNavShowing && (
                    <span className="text-sm">{menuItem.label}</span>
                  )}
                  {!isNavShowing && hoveredIcon === menuItem.label && (
                    <span className="absolute w-max bg-blue-500 p-[10px] rounded-md z-10 text-sm left-full ml-2 top-1/2 transform -translate-y-1/2">
                      {hoveredIcon}
                    </span>
                  )}
                </span>

              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

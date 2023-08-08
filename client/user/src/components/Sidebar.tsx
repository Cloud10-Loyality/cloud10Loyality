"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { Menu } from "lucide-react";
// import { Menu } from "./ui/icons";
import { menuData } from "@/utils/Constant";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";

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
        className={`h-screen row-span-3 px-6 ${
          isNavShowing ? "min-w-[200px]" : "w-max"
        } row-span-2 border-2 border-muted relative`}
      >
        <div className="cursor-pointer text-lg flex px-2 place-items-center h-[10vh] relative">
          <button onClick={toggleSidebar}>
            <Menu size={23} />
          </button>
        </div>
        <ul className="flex flex-col space-y-3">
          {menuData.map((menuItem) => {
            const isDisabled = menuItem.disabled; // Check if the menu item is disabled
            const linkContent = (
              <span
                className="flex items-center space-x-3 relative"
                onMouseEnter={() => handleIconHover(menuItem.label)}
                onMouseLeave={handleIconLeave}
              >
                <span>{menuItem.icon}</span>
                {isNavShowing && (
                  <span className="text-md font-bold">{menuItem.label}</span>
                )}
                {!isNavShowing && hoveredIcon === menuItem.label && (
                  <span className="absolute w-max bg-muted p-[10px] rounded-md z-10 text-sm left-full ml-2 top-1/2 transform -translate-y-1/2">
                    {hoveredIcon}
                  </span>
                )}
              </span>
            );

            if (isDisabled) {
              return (
                <li
                  key={menuItem.id}
                  className="px-2 w-full rounded-md py-2 text-gray-500 cursor-not-allowed "
                >
                  {linkContent}
                </li>
              );
            }

            return (
              <li
                key={menuItem.id}
                className="hover:bg-muted px-2 w-full rounded-md py-2"
              >
                <Link href={menuItem.link}>{linkContent}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

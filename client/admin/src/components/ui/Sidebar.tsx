"use-client";
import { useState } from "react";
import Link from "next/link";
import { menuData } from "@/utils/Constant";
import { Menu } from "lucide-react";

type Props = {};

export const Sidebar = (props: Props) => {
  const [activeMenus, setActiveMenus] = useState<number[]>([]);
  const [clickedSubMenu, setClickedSubMenu] = useState<{
    [key: number]: number | null;
  }>({});

  const toggleSubMenu = (menuId: number) => {
    if (activeMenus.includes(menuId)) {
      setActiveMenus(activeMenus.filter((id) => id !== menuId));
    } else {
      setActiveMenus([...activeMenus, menuId]);
    }
  };

  return (
    <div className="h-full row-span-3 ml-3 w-auto mr-3">
      <div className="cursor-pointer text-lg flex px-2 place-items-center h-[10vh] relative">
        <button onClick={() => setActiveMenus([])}>
          <Menu size={24} />
        </button>
      </div>
      <ul className="flex flex-col space-y-3">
        {menuData.map((menuItem) => {
          const isSubMenuVisible = activeMenus.includes(menuItem.id);
          return (
            <li
              key={menuItem.id}
              className={`px-2 w-full rounded-md py-2 ${
                isSubMenuVisible ? "" : ""
              }`}
            >
              <div
                className="cursor-pointer"
                onClick={() => toggleSubMenu(menuItem.id)}
              >
                <span className="flex items-center space-x-3 relative">
                  {menuItem.icon}
                  <span className="text-md font-bold">{menuItem.label}</span>
                </span>
              </div>
              {isSubMenuVisible && (
                <ul className="ml-4">
                  {menuItem.subMenu?.map((subMenuItem) => {
                    const isSubMenuClicked =
                      clickedSubMenu[menuItem.id] === subMenuItem.id;
                    return (
                      <li key={subMenuItem.id}>
                        <Link href={subMenuItem.link || ""}>
                          <div
                            className={`cursor-pointer flex items-center space-x-2 m-3 p-2 ${
                              isSubMenuClicked
                                ? "bg-gray-200 text-black rounded-md"
                                : "hover:bg-gray-200 hover:text-black hover:rounded-md"
                            }`}
                            onClick={() =>
                              setClickedSubMenu((prevClickedSubMenu) => ({
                                ...prevClickedSubMenu,
                                [menuItem.id]: subMenuItem.id,
                              }))
                            }
                          >
                            {subMenuItem.icon}
                            <span className="text-sm">{subMenuItem.label}</span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

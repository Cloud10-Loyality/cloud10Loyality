"use client";

import { SidebarItem } from "@/libs/useSidebarData";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React from "react";

const SidebarItem = ({
  item,
  isOpen,
  isActive,
}: {
  item?: SidebarItem;
  isOpen?: boolean;
  isActive?: boolean;
}) => {
  return (
    <Link href={`${item?.href}`}>
      <div
        className={`flex items-center mb-2 rounded-lg gap-3 hover:bg-secondary-light dark:hover:bg-secondary-dark ${
          isActive && "bg-secondary-light dark:bg-secondary-dark"
        } cursor-pointer font-semibold transition-all duration-200 py-4 px-4`}
      >
        <span className="">{item?.icon}</span>
        {isOpen ? <span>{item?.name}</span> : null}
      </div>
    </Link>
  );
};

export default SidebarItem;

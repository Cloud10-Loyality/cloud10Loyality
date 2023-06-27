"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useId } from "react";
import { RootState, store, useDispatch, useSelector } from "@/redux/store";

import { Hamburger } from "@/components/ui/icons";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import { handleSidebar } from "@/redux/slices/sidebarSlice";
import { useSelectedLayoutSegment } from "next/navigation";
import { useSidebarData } from "@/libs/useSidebarData";

type Props = {};

export default function Sidebar({}: Props) {
  const id = useId();
  const SIDEBAR_DATA = useSidebarData();

  const { isOpen } = useSelector((state: RootState) => state.sidebarReducer);

  const dispatch = useDispatch();

  const segment = useSelectedLayoutSegment();

  const isCurrentPage = (href: string) => {
    return segment ? href.includes(segment) : href.endsWith("/app");
  };

  return (
    <div
      className={`h-screen ${
        isOpen ? "min-w-[250px]" : "w-max"
      } row-span-2 relative border-r-2 border-muted`}
    >
      <div className="pb-4">
        <div className="cursor-pointer px-6 h-[10vh] flex items-center">
          <Hamburger onClick={() => dispatch(handleSidebar(!isOpen))} />
        </div>
        <div className="space-y-2 px-2 mt-4">
          {SIDEBAR_DATA.map((item) => (
            <SidebarItem
              key={`${id}+${item?.name}`}
              item={item}
              isOpen={isOpen}
              isActive={isCurrentPage(item?.href)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import React, { useId } from "react";
import { useSidebarData } from "@/libs/useSidebarData";
import SidebarItem from "./SidebarItem";
import { Hamburger } from "@/components/ui/icons";
import { RootState, store, useDispatch, useSelector } from "@/redux/store";
import { handleSidebar } from "@/redux/slices/sidebarSlice";
import { AnimatePresence, motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";

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
      } row-span-2 bg-primary-light dark:bg-primary-dark relative`}
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

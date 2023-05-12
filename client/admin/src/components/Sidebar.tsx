"use client";
import React from "react";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import LayersIcon from "@material-ui/icons/Layers";
import LockIcon from "@material-ui/icons/Lock";
import EcoIcon from "@material-ui/icons/Eco";
import Link from "next/link";
const Sidebar = () => {
  return (
    <div className="bg-[#33383E]">
      <div className=" border-b py-3 flex justify-around ">
        <p className="text-xl  font-semibold">elrond</p>
      </div>
      <div className="p-4 space-y-14">
        <div className="space-y-4">
          <h1 className="text-greyheadColor text-sm">Menu</h1>
          <div className="">
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-[#5BA191] rounded-lg hover:text-blue-600  cursor-pointer  ">
              <DonutLargeIcon className=" text-gray-300" />
              <Link href="/" className="text-secondaryColor text-sm">
                Home
              </Link>
            </div>
          </div>
          <div className="">
            <div className="flex p-3 text-gray-700  space-x-4 0  hover:bg-[#5BA191] hover:text-blue-600  cursor-pointer  ">
              <ClearAllIcon className="text-gray-300" />
              <Link
                href="./../marketplace"
                className="text-secondaryColor text-sm"
              >
                Marketplace
              </Link>
            </div>
          </div>
          <div className="">
            <div className="flex p-3 text-gray-700  space-x-4 0  hover:bg-[#5BA191] hover:text-blue-600  cursor-pointer  ">
              <ArrowUpwardIcon className="text-gray-300" />
              <Link href="./../setup" className="text-secondaryColor text-sm">
                SetUP
              </Link>
            </div>
          </div>
          <div className="">
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-[#5BA191] hover:text-blue-600  cursor-pointer  ">
              <ArrowDownwardIcon className="text-gray-300" />
              <Link
                href="./../analytics"
                className="text-secondaryColor text-sm"
              >
                Analytics
              </Link>
            </div>
          </div>
          <div className="">
            <div className="flex p-3 text-gray-700 space-x-4 0 hover:bg-[#5BA191] hover:text-blue-600  cursor-pointer  ">
              <SyncAltIcon className="text-gray-300" />
              <p className="text-secondaryColor text-sm">NFT</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-greyheadColor text-sm">Developer</h1>
          <div className="">
            <div className="flex p-3 text-gray-700 space-x-4 0  hover:bg-[#5BA191] hover:text-blue-600  cursor-pointer  ">
              <LockIcon className="text-gray-300" />
              <p className="text-secondaryColor text-sm">Integration</p>
            </div>
          </div>
          <div className="">
            <div className="flex p-3 text-gray-700 space-x-4 0  hover:bg-[#5BA191] hover:text-blue-600  cursor-pointer  ">
              <EcoIcon className="text-gray-300" />
              <p className="text-secondaryColor text-sm">Extensions</p>
            </div>
          </div>
          <div className="">
            <div className="flex p-3 text-gray-700 space-x-4 0  hover:bg-[#5BA191] hover:text-blue-600  cursor-pointer  ">
              <EcoIcon className="text-gray-300" />
              <p className="text-secondaryColor text-sm">Go to sandbox</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-greyheadColor text-sm">More</h1>
          <div className="">
            <div className="flex p-3 text-gray-700 space-x-4 0  hover:bg-[#5BA191] hover:text-blue-600  cursor-pointer  ">
              <LayersIcon className="text-gray-300" />
              <p className="text-secondaryColor text-sm">Admin</p>
            </div>
          </div>
          <div className="">
            <div className="flex p-3 text-gray-700  space-x-4 0  hover:bg-[#5BA191] hover:text-blue-600  cursor-pointer  ">
              <LayersIcon className="text-gray-300" />
              <p className="text-secondaryColor text-sm">Request a Feature</p>
            </div>
          </div>
          <div className="">
            <div className="flex p-3 text-gray-700  space-x-4 0  hover:bg-[#5BA191] hover:text-blue-600  cursor-pointer  ">
              <LayersIcon className="text-gray-300" />
              <p className="text-secondaryColor text-sm">Help Center</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;

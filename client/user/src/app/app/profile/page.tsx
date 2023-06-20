"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../public/assets/logo.png";
import { userProfile } from "@/utils/UserData";
import PieChart from "@/components/chart/PieChart";
import TierComponent from "@/components/Tier/TierComponents";

type Props = {};

const Page = (props: Props) => {
  const points: number = 50;
  return (
    <><div className="flex flex-col justify-center items-start mt-2 p-4">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-200 "></div>
        <div>
          <h2 className="text-2xl font-bold dark:text-white">User Name</h2>
          <p className="text-gray-500 text-lg">Role</p>
        </div>
      </div>

      <div className="w-full bg-white dark:bg-[#272F3C] rounded-md p-6 shadow-md">
        <ul>
          {userProfile.map((user) => (
            <li className="mb-3">
              <span className="text-lg text-[#203582] dark:text-white font-bold">
                {user.label}
              </span>
              <br />
              <span className="text-base dark:text-white">{user.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    </>
  );
};

export default Page;


// <div className="flex flex-col justify-center items-center">
//   {/* <div className="bg-white p-5 rounded-md">
//     <PieChart />
//   </div> */}
//   {/* <div className="mt-6">
//     <TierComponent points={points} />
//   </div> */}
// </div>
"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../public/assets/logo.png";
import { userProfile } from "@/utils/UserData";
import PieChart from "@/components/chart/PieChart";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <div className="flex flex-row space-x-14  md:flex-row md:space-y-0 md:space-x-14">
        <div className="ml-3 w-[250px] dark: bg-white rounded-md ">
          {/* <Image
            src={logo}
            alt="Logo of manager site"
            width={100}
            height={100}
          /> */}

          <ul className="p-6">
            {userProfile.map((user) => (
              <li className="mb-3">
                <span className="text-xs text-[#203582] font-bold ">
                  {user.label}
                </span>
                <br />
                <span className="text-sm">{user.description}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-5 ">
          <PieChart />
        </div>
      </div>
    </>
  );
};

export default page;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../public/assets/logo.png";
import { userProfile } from "@/utils/UserData";
import PieChart from "@/components/PieChart";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <div className="flex flex-row space-x-16">
        <div className="ml-3 w-[300px] bg-white rounded-md ">
          <Image
            src={logo}
            alt="Logo of manager site"
            width={100}
            height={100}
          />

          <div>
            <ul className="p-4">
              {userProfile.map((user) => (
                <li className="mb-1">
                  <span className="text-xs text-gray-500 space-y-6">
                    {user.label}
                  </span>
                  <br />
                  <span>{user.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-white p-5 ">
          <PieChart />
        </div>
      </div>
    </>
  );
};

export default page;

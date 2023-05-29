import React from "react";
import hero_section_draw from "./../../../public/illustrations/hero_section_draw.svg";
import Image from "next/image";

type Props = {};

export default function Dashboard({}: Props) {
  return (
    <div>
      <div className="dark:bg-gray-800 flex justify-between bg-gray-200 py-6 border-white border border-opacity-25 px-4 rounded-lg">
        <h1 className="font-black text-2xl">
          Welcome to Cloud10 Loyalty Management System
        </h1>
      </div>
    </div>
  );
}

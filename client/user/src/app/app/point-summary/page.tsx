"use client";

import DoughnutChart from "@/components/chart/DoughnutChart";
import Graph from "@/components/chart/Graph";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <div className="flex flex-row h-max ml-5  ">
        <div className=" bg-white dark:bg-[#272F3C] dark:text-white w-[600px] p-5 sm:min-w-fit">
          <h3 className="text-blue-500 mb-8 ">General Overview</h3>
          {/* <DoughnutChart /> */}
          <Graph />
        </div>
        <div></div>
      </div>
    </>
  );
};

export default page;

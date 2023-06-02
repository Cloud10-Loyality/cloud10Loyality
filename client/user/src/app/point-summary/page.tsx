"use client";

import DoughnutChart from "@/components/chart/DoughnutChart";
import PointsTable from "@/components/table/PointsTable";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <div className="flex flex-row h-max ml-5  ">
        <div className=" bg-white max-w-max p-5 sm:min-w-fit">
          <h3 className="text-blue-500 mb-8 ">General Overview</h3>
          <DoughnutChart />
        </div>
        <div></div>
      </div>
    </>
  );
};

export default page;

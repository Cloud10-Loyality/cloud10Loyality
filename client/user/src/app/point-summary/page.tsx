"use client";

import DoughnutChart from "@/components/chart/DoughnutChart";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <h3 className="text-blue-500">General Overview</h3>
      <div className="bg-white">
        <DoughnutChart />
      </div>
    </div>
  );
};

export default page;

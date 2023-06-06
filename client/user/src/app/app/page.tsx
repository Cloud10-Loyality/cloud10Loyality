import Navbar from "@/components/Navbar";
import Timeline from "@/components/Timeline";

import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className=" font-light h-full">
      <div className="flex flex-row  ml-3">
        <div className="p-3 w-80 ml-2 mr-2 dark:text-white bg-white dark:bg-[#33383e] rounded-md ">
          <div className="p-2 gap-2 space-y-2">
            <h3>Total Spending</h3>
            <p className="text-xl font-bold">$450</p>
          </div>
          <hr />
          <ul className="m-2  text-md space-y-3">
            <li className="flex place-content-between gap-4 ">
              <h4>Avg Booking Value</h4>
              <span>$210</span>
            </li>
            <li className="flex place-content-between">
              <h4>Bookings</h4>
              <span>18</span>
            </li>
            <li className="flex place-content-between">
              <h4>Since the last bookings</h4>
              <span>3</span>
            </li>
          </ul>
        </div>
        <div className="p-3 w-80 ml-9 mr-4 dark:text-white bg-white dark:bg-[#33383e] rounded-md ">
          <div className="p-2 gap-2 space-y-2">
            <h3>Active Points</h3>
            <p className="text-xl font-bold">188</p>
          </div>
          <hr />
          <ul className="m-2  text-md space-y-2">
            <li className="flex place-content-between gap-4 ">
              <h4>Pending point</h4>
              <span>27</span>
            </li>
            <li className="flex place-content-between">
              <h4>Used points</h4>
              <span>20</span>
            </li>
            <li className="flex place-content-between">
              <h4>Expired points</h4>
              <span>3</span>
            </li>
          </ul>
        </div>
        <div className="p-3 w-80 ml-9 mr-4 dark:text-white bg-white dark:bg-[#33383e] rounded-md ">
          <div className="p-2 gap-2 space-y-2">
            <h3>Current Tier</h3>
            <p className="text-xl font-bold">Silver</p>
          </div>
          <hr />
          <ul className="m-2  text-md space-y-2">
            <li className="flex place-content-between gap-4 ">
              <h4>Points to the next tier</h4>
              <span>9</span>
            </li>
            <li className="flex place-content-between">
              <h4>Tier promotion date</h4>
              <span>20 aug 2024</span>
            </li>
            <li className="flex place-content-between">
              <h4>Tier reset date</h4>
              <span>19 jan 2024</span>
            </li>
          </ul>
        </div>
      </div>
      {/* //* Timeline */}
      <Timeline />
    </div>
  );
}

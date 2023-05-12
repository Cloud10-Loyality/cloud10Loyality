"use client";
import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CropLandscapeIcon from "@material-ui/icons/CropLandscape";
import AppsIcon from "@material-ui/icons/Apps";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
const Navbar = () => {
  return (
    <div className="flex shadow-sm bg-[#20232A]  p-4 justify-between h-max ">
      <div className="flex space-x-3  ">
        <DashboardIcon className="text-gray-300" />
      </div>
      <div className="flex space-x-4 text-gray-400 mr-3">
        <AppsIcon />
        <ExitToAppIcon />
        <p className="text-gray-600 font-semibold">Hi, Team</p>
      </div>
    </div>
  );
};
export default Navbar;

"use client";
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const propTypes = {};

const defaultProps = {};

/**
 *
 */
const Layout = ({ children }) => {
  return (
    <div className="col-span-12 bg-primaryColor h-full rounded-lg  mt-4 my-4 ml-4 mr-4">
      <ul
        id="progressbar"
        className="px-8 py-5 inline-flex items-center  w-full"
      >
        <div className="px-8 py-5 inline-flex items-center w-36 ">
          <li className="text-xs text-secondaryColor px-4 rounded-full absolute flex flex-col justify-center items-center bg-btColor w-10 h-10">
            1
          </li>
          <li className="text-xs pl-10 ml-5 absolute  text-secondaryColor">
            Brand
          </li>
        </div>
        <hr className="w-32 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="px-8 py-5 inline-flex items-center w-36 ">
          <li className="text-xs text-secondaryColor px-4 rounded-full absolute flex flex-col justify-center items-center bg-btColor w-10 h-10">
            2
          </li>
          <li className="text-xs pl-10 ml-5 absolute  text-secondaryColor">
            Loyality Point
          </li>
        </div>
        <hr className="w-16 h-px my-8 ml-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="px-8 py-5 inline-flex items-center w-36 ">
          <li className="text-xs text-secondaryColor px-4 rounded-full absolute flex flex-col justify-center items-center bg-btColor w-10 h-10">
            3
          </li>
          <li className="text-xs pl-10 ml-5 absolute  text-secondaryColor">
            Package
          </li>
        </div>
        <hr className="w-36 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="px-8 py-5 inline-flex items-center w-36 ">
          <li className="text-xs text-secondaryColor px-4 rounded-full absolute flex flex-col justify-center items-center bg-btColor w-10 h-10">
            4
          </li>
          <li className="text-xs pl-10 ml-5 absolute  text-secondaryColor">
            Status
          </li>
        </div>
        <hr className="w-36 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      </ul>
      {children}
    </div>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;
// #endregion

export default Layout;

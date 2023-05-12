"use client";
import { useState } from "react";
function Setup() {
  return (
    <div className="text-secondaryColor px-8 items-center w-full">
      <form className="px-5 py-5">
        <h6>Brand details</h6>
        <p className="text-xs py-2">
          Whether you start a new loyality program or add exchange transactions
          to your existing one, Fill in the details below to get started
        </p>
        <div className="grid grid-cols-12 gap-2 px-8 py-8">
          <div className="col-span-2 text-xs text-secondaryColor rounded-full justify-center items-center bg-btColor w-36 h-36"></div>
          <div className="col-span-5">
            <p className="text-sm">Brand</p>
            <p className="text-sm">No File Choosen</p>
            <label
              htmlFor="Brand_name"
              className=" text-secondaryColor py-2 block text-sm"
            >
              Brand Name
            </label>
            <input
              type="text"
              name="Brand_name"
              id="Brand_name"
              autoComplete="name"
              className=" bg-primaryColor appearance-none rounded relative block w-full px-3 py-2 border bg- placeholder-gray-500 rounded-t-md focus:outline-none  focus:z-10 sm:text-sm"
            />
          </div>

          <div className="col-span-5 py-10">
            <label
              htmlFor="Brand_name"
              className=" text-secondaryColor py-2 block text-sm"
            >
              Brand website
            </label>
            <input
              type="text"
              name="Brand_name"
              id="Brand_name"
              autoComplete="name"
              className=" bg-primaryColor appearance-none rounded relative block w-full px-3 py-2 border bg- placeholder-gray-500 rounded-t-md focus:outline-none  focus:z-10 sm:text-sm"
            />
          </div>
          <div className="col-span-12">
            <label
              htmlFor="Brand_name"
              className=" text-secondaryColor py-2 block text-sm"
            >
              Street address
            </label>
            <input
              type="text"
              name="Brand_name"
              id="Brand_name"
              autoComplete="name"
              className=" bg-primaryColor appearance-none rounded relative block w-full px-3 py-2 border bg- placeholder-gray-500 rounded-t-md focus:outline-none  focus:z-10 sm:text-sm"
            />
          </div>

          <div className="col-span-4">
            <label
              htmlFor="Brand_name"
              className=" text-secondaryColor py-2 block text-sm"
            >
              Zip Code
            </label>
            <input
              type="text"
              name="Brand_name"
              id="Brand_name"
              autoComplete="name"
              className=" bg-primaryColor appearance-none rounded relative block w-full px-3 py-2 border bg- placeholder-gray-500 rounded-t-md focus:outline-none  focus:z-10 sm:text-sm"
            />
          </div>
          <div className="col-span-4">
            <label
              htmlFor="Brand_name"
              className=" text-secondaryColor py-2 block text-sm"
            >
              Street
            </label>
            <input
              type="text"
              name="Brand_name"
              id="Brand_name"
              autoComplete="name"
              className=" bg-primaryColor appearance-none rounded relative block w-full px-3 py-2 border bg- placeholder-gray-500 rounded-t-md focus:outline-none  focus:z-10 sm:text-sm"
            />
          </div>
          <div className="col-span-4">
            <label
              htmlFor="Brand_name"
              className=" text-secondaryColor py-2 block text-sm"
            >
              Country
            </label>
            <select
              id="country"
              name="country"
              className=" bg-primaryColor appearance-none rounded relative block w-full px-3 py-2 border bg- placeholder-gray-500 rounded-t-md focus:outline-none  focus:z-10 sm:text-sm"
            >
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
            {/* <div className="relative inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </div> */}
          </div>
          <div className="md:col-span-12 text-right">
            <div className="inline-flex items-end">
              <button className="bg-btColor hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Continue
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Setup;

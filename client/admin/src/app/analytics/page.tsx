"use client";
import Image from "next/image";
import Logomarketplace from "./../../assets/online-shop.png";
import { useState } from "react";
import LogoBank from "./../../assets/bank.png";
import LogoPartners from "./../../assets/partners.png";
import DropdownButton from "./dropdownbutton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Analytics(date: Date) {
  const options = ["Option 1", "Option 2", "Option 3"];
  const [selectedDate, setSelectedDate] = useState(new Date());
  const intervals = ["Daily", "Weekly", "Monthly", "Yearly"];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Daily");

  return (
    <>
      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="col-span-1 bg-[#33383E] rounded p-4">
          <div className="left-card">
            <h4 className="text-md text-secondaryColor">Analytics</h4>
            <div className="flex mt-4 space-x-3 md:mt-6 border-b-2 border-solid">
              <p className="inline-flex items-center px-4 py-2  mb-4 text-textcolor text-sm font-medium text-center ">
                <Image src={Logomarketplace} className="px-2 h-5 w-10" alt="" />
                Market place
              </p>
              <p className="inline-flex items-center px-4 py-2  mb-4 text-sm font-medium text-center text-line ">
                <Image src={LogoBank} className="px-2 h-5 w-10" alt="" />
                Points bank
              </p>
            </div>
            <p className="text-secondaryColor px-5 py-5 text-base">
              This dashboard displays important prebuilt analyses for all
              marketplace transactions to provide you with a general perspective
              of the recency, frequency, and monetary aspects of the marketplace
              activities performed by your members.
            </p>
          </div>
        </div>

        <div className="col-span-2 bg-[#33383E] p-4 rounded">
          <div className="right-card">
            <div className="text-secondaryColor px-5 py-5 text-base">
              <DropdownButton options={options} />
            </div>
            <p className="text-secondaryColor px-5 py-5 text-base">
              Let's improve the marketplace volume of your loyalty program! Head
              over to marketplace section to explore and add more partnerships
            </p>
            <div className="md:col-span-12 text-right px-8">
              <div className="inline-flex items-end">
                <button className="bg-btColor inline-flex items-center mb-4  text-sm text-center  text-white font-bold py-2 px-4 rounded  my-5">
                  <Image src={LogoPartners} className="px-2 h-5 w-10" alt="" />
                  Connect to partners
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 bg-[#33383E] rounded py-4 mt-2">
        <div className="dropdownsection p-4">
          <h6 className="text-sm text-secondaryColor">Date range</h6>
        </div>
        <div className="dropdownsection p-4">
          <h6 className="text-sm text-secondaryColor">From</h6>
          <div className="mt-1 py-2">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="block w-full px-4 py-2 bg-secondaryColor border rounded-md shadow-sm appearance-none "
            />
          </div>
        </div>
        <div className="dropdownsection p-4">
          <h6 className="text-sm text-secondaryColor">To</h6>
          <div className="mt-1 py-2">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="dropdownsection p-4">
          <h6 className="text-sm text-secondaryColor">Interval</h6>
          <div className="relative inline-block text-left py-2">
            <div>
              <span className="rounded-md shadow-sm">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border bg-primaryColor px-4 py-2 text-sm font-medium text-secondaryColor"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {selectedItem}
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M10 14l6-6H4z" />
                  </svg>
                </button>
              </span>
            </div>
            <div
              className={`${
                isOpen ? "" : "hidden"
              } origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                {intervals.map((item) => (
                  <button
                    key={item}
                    className={`${
                      selectedItem === item
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700"
                    } block px-4 py-2 text-sm text-left w-full`}
                    role="menuitem"
                    tabIndex={-1}
                    id={`menu-item-${item}`}
                    onClick={() => {
                      setSelectedItem(item);
                      setIsOpen(false);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="dropdownsection p-4">
          <h6 className="text-sm text-secondaryColor">Transaction type</h6>
        </div>
      </div>
    </>
  );
}
export default Analytics;

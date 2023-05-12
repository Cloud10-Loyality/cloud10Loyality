"use client";
import Layoutpoint from "@/components/Layout";
import Header from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Marketplace from "./../assets/marketplace.png";
import Image from "next/image";
export default function Home() {
  return (
    <div className="bg-[#20232A] to-gray-50 h-full ">
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-2 bg-primaryColor h-24 rounded-lg  mt-4 my-4 ml-4 mr-4">
          <div className="flex justify-between py-4 px-4">
            <span className="text-secondaryColor text-sm">
              Exchange activity
            </span>
            <div className="bg-btColor w-8 h-8 rounded-full flex items-center justify-center">
              <Image src={Marketplace} alt="" className="h-2 w-2" />
            </div>
          </div>
          <div className="flex justify-between px-4">
            <span className="text-btColor text-md">0</span>
          </div>
        </div>
        <div className="col-span-2 bg-primaryColor h-24 rounded-lg  mt-4 my-4 ml-4 mr-4">
          <div className="flex justify-between py-4 px-4">
            <span className="text-secondaryColor text-sm">
              Exchange activity
            </span>
            <span>
              <div className="bg-btColor w-8 h-8 rounded-full flex items-center justify-center">
                <Image src={Marketplace} alt="" className="h-2 w-2" />
              </div>
            </span>
          </div>
          <div className="flex justify-between px-4">
            <span className="text-btColor text-md">0</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 px-4 py-4">
        <div className="colspan2 overflow-hidden">
          <div className="max-w-sm p-6 bg-[#33383E] border border-none rounded-lg shadow ">
            <div className="inner-text">
              <h5 className="mb-2 text-1xl font-bold text-secondaryColor">
                Let's get you started
              </h5>
              <p className="text-secondaryColor text-sm">
                Complete your setup to get access to the whole dashboard and get
                rewarded with 20 Cloud 10 reward points (QRP)(QRP =1 USD) that
                can be exchanged for crypto, miles,loyalty points and more.
              </p>
              <div className="inner-text-1">
                <p className="text-secondaryColor text-xs py-4 px-0">
                  Brand details
                </p>
                <div className="flex justify-between py-2 px-0 border-b-2 border-solid border-gray-500">
                  <span className="text-greyColor text-xs">
                    Step 1 of the setup
                  </span>
                  <span>
                    <div className="text-greyColor  text-xs flex items-center justify-center">
                      50%
                    </div>
                  </span>
                </div>
              </div>
              <div className="inner-text-1">
                <p className="text-secondaryColor text-xs py-4 px-0">
                  Loyalty point details
                </p>
                <div className="flex justify-between py-2 px-0 border-b-2 border-solid border-gray-500">
                  <span className="text-greyColor text-xs">
                    Step 2 of the setup
                  </span>
                  <span>
                    <div className="text-greyColor  text-xs flex items-center justify-center">
                      0%
                    </div>
                  </span>
                </div>
              </div>
              <div className="inner-text-1">
                <p className="text-secondaryColor text-xs py-4 px-0">
                  Subscription package
                </p>
                <div className="flex justify-between py-2 px-0 border-b-2 border-solid border-gray-500">
                  <span className="text-greyColor text-xs">
                    Step 3 of the setup
                  </span>
                  <span>
                    <div className="text-greyColor  text-xs flex items-center justify-center">
                      0%
                    </div>
                  </span>
                </div>
              </div>
              <div className="inner-text-1">
                <p className="text-secondaryColor text-xs py-4 px-0">
                  Status verification
                </p>
                <div className="flex justify-between py-2 px-0 border-b-2 border-solid border-gray-500">
                  <span className="text-greyColor text-xs">
                    Step 4 of the setup
                  </span>
                  <span>
                    <div className="text-greyColor  text-xs flex items-center justify-center">
                      0%
                    </div>
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="text-secondaryColor focus:outline-none mt-5 py-2 px-5 mr-2 w-full mb-2 text-sm bg-btColor rounded-lg border:none "
              >
                Continue setup
              </button>
            </div>
          </div>
          <div className="max-w-sm p-6 bg-[#33383E] border border-none rounded-lg shadow h-1/3 mt-4">
            <div className="inner-text">
              <h5 className="mb-2 text-1xl font-bold text-secondaryColor">
                Integration
              </h5>
              <p className="text-secondaryColor text-sm">
                Select the integration option best suited to you and get started
              </p>
              <button
                type="button"
                className="text-secondaryColor focus:outline-none mt-16 py-2 px-5 mr-2 w-full mb-2 text-sm bg-btColor rounded-lg border:none"
              >
                Explore integration
              </button>
            </div>
          </div>
        </div>
        <div className="colspan2 overflow-hidden">
          <div className="max-w-sm p-6 bg-[#33383E] border border-none rounded-lg shadow h-auto">
            <div className="inner-text">
              <h5 className="mb-2 text-1xl font-bold text-secondaryColor">
                Read to success{" "}
              </h5>
              <p className="text-secondaryColor text-sm">
                Complete all the milestones listed below to boost your loyalty
                program and get rewarded with 500 Cloud 10 reward points (QRP)
                (1 QRP = 1 USD) that can be exchanged for crypto, miles, loyalty
                points and more.
              </p>
              <div className="inner-text-1">
                <p className="text-secondaryColor text-xs py-4 px-0">
                  Mandatory:Have 3 active reward partnerships
                </p>
                <div className="flex justify-between py-2 px-0 border-b-2 border-solid border-gray-500">
                  <span className="text-greyColor text-xs">Reward:50 QRP</span>
                  <span>
                    <div className="text-greyColor  text-xs flex items-center justify-center">
                      50%
                    </div>
                  </span>
                </div>
              </div>
              <div className="inner-text-1">
                <p className="text-secondaryColor text-xs py-4 px-0">
                  Record 100 exchange transactions
                </p>
                <div className="flex justify-between py-2 px-0 border-b-2 border-solid border-gray-500">
                  <span className="text-greyColor text-xs">Reward :50 QRP</span>
                  <span>
                    <div className="text-greyColor  text-xs flex items-center justify-center">
                      0%
                    </div>
                  </span>
                </div>
              </div>
              <div className="inner-text-1">
                <p className="text-secondaryColor text-xs py-4 px-0">
                  Have 10 active reward partnerships
                </p>
                <div className="flex justify-between py-2 px-0 border-b-2 border-solid border-gray-500">
                  <span className="text-greyColor text-xs">Reward :50 QRP</span>
                  <span>
                    <div className="text-greyColor  text-xs flex items-center justify-center">
                      0%
                    </div>
                  </span>
                </div>
              </div>
              <div className="inner-text-1">
                <p className="text-secondaryColor text-xs py-4 px-0">
                  Total value of exchanged is over USD 1’000
                </p>
                <div className="flex justify-between py-2 px-0 border-b-2 border-solid border-gray-500">
                  <span className="text-greyColor text-xs">Reward :50 QRP</span>
                  <span>
                    <div className="text-greyColor  text-xs flex items-center justify-center">
                      0%
                    </div>
                  </span>
                </div>
              </div>
              <div className="inner-text-1">
                <p className="text-secondaryColor text-xs py-4 px-0">
                  Total value of exchanged is over USD 5’000
                </p>
                <div className="flex justify-between py-2 px-0 border-b-2 border-solid border-gray-500">
                  <span className="text-greyColor text-xs">Reward :50 QRP</span>
                  <span>
                    <div className="text-greyColor  text-xs flex items-center justify-center">
                      0%
                    </div>
                  </span>
                </div>
              </div>
              <div className="inner-text-1">
                <p className="text-secondaryColor text-xs py-4 px-0">
                  Total value of exchanged is over USD 20’000
                </p>
                <div className="flex justify-between py-2 px-0 border-b-2 border-solid border-gray-500">
                  <span className="text-greyColor text-xs">Reward :50 QRP</span>
                  <span>
                    <div className="text-greyColor  text-xs flex items-center justify-center">
                      0%
                    </div>
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="text-secondaryColor focus:outline-none mt-5 py-2 px-5 mr-2 w-full mb-2 text-sm bg-btColor rounded-lg border:none"
              >
                Continue setup
              </button>
            </div>
          </div>
        </div>
        <div className="colspan2 overflow-hidden">
          <div className="max-w-sm p-6 bg-[#33383E] border border-none rounded-lg shadow h-1/3">
            <div className="inner-text">
              <h5 className="mb-2 text-1xl font-bold text-secondaryColor">
                Rewards Marketplace
              </h5>
              <p className="text-secondaryColor text-sm">
                List your own loyality currency,request new reward partnerships
                and manage existing.{" "}
              </p>
              <button
                type="button"
                className="text-secondaryColor focus:outline-none mt-16 py-2 px-5 mr-2 w-full mb-2 text-sm bg-btColor rounded-lg border:none"
              >
                Continue setup
              </button>
            </div>
          </div>
          <div className="max-w-sm p-6 bg-[#33383E] border border-none rounded-lg shadow h-1/3 mt-4">
            <div className="inner-text">
              <h5 className="mb-2 text-1xl font-bold text-secondaryColor">
                Analytics
              </h5>
              <p className="text-secondaryColor text-sm">
                Get valuable insights to manage and boost your loyalty program
                in the right direction.
              </p>
              <button
                type="button"
                className="text-secondaryColor focus:outline-none mt-16 py-2 px-5 mr-2 w-full mb-2 text-sm bg-btColor rounded-lg border:none"
              >
                View analytics
              </button>
            </div>
          </div>
          <div className="max-w-sm p-6 bg-[#33383E] border border-none rounded-lg shadow h-1/3 mt-4">
            <div className="inner-text">
              <h5 className="mb-2 text-1xl font-bold text-secondaryColor">
                Help center
              </h5>
              <p className="text-secondaryColor text-sm">
                Learn more about the Cloud10 Loyalty Admin Dashboard(LAD) and
                our products.{" "}
              </p>
              <button
                type="button"
                className="text-secondaryColor focus:outline-none mt-16 py-2 px-5 mr-2 w-full mb-2 text-sm bg-btColor rounded-lg border:none"
              >
                Go to help center
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

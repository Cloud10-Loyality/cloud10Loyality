"use client";
import Image from "next/image";
import { useState } from "react";
import Logo from "./../../assets/cloud10.png";
const Marketplace = () => {
  const [currentTab, setCurrentTab] = useState("1");
  const tabs = [
    {
      id: 1,
      tabTitle: "potential partner",
      title: "potential partner",
      content:
        "Las tabs se generan automáticamente a partir de un array de objetos, el cual tiene las propiedades: id, tabTitle, title y content.",
    },
    {
      id: 2,
      tabTitle: "Active Partner",
      title: "Active Partner",
      content: "Contenido de tab 2.",
    },
    {
      id: 3,
      tabTitle: "Partner's Request",
      title: "Partner's Request",
      content: "Contenido de tab 3.",
    },
    {
      id: 4,
      tabTitle: "Brands you Love",
      title: "Brands you Love",
      content: "Contenido de tab 4.",
    },
  ];
  const handleTabClick = (event) => {
    setCurrentTab(event.target.id);
  };
  return (
    <>
      <div className="bg-[#20232A] h-full ">
        <div className="grid grid-cols-10 gap-2">
          <div className="col-span-10 bg-primaryColor h-90 rounded-lg  mt-4 my-4 ml-4 mr-4">
            <div className="flex justify-between py-4 px-4">
              <span className="text-secondaryColor text-sm">
                Exchange activity
              </span>
              <span>
                <div className="bg-btColor w-8 h-8 rounded-full flex items-center justify-center"></div>
              </span>
            </div>
            <div className="flex justify-between px-4">
              <div className="container">
                <div className="tabs text-sm text-secondaryColor">
                  {tabs.map((tab, i) => (
                    <button
                      key={i}
                      id={tab.id}
                      disabled={currentTab === `${tab.id}`}
                      onClick={handleTabClick}
                    >
                      {tab.tabTitle}
                    </button>
                  ))}
                </div>
                <div className="content text-sm text-secondaryColor">
                  {tabs.map((tab, i) => (
                    <div key={i}>
                      {currentTab === `${tab.id}` && (
                        <div>
                          <p className="title">{tab.title}</p>
                          <p>{tab.content}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 px-4 py-4">
          <div className="max-w-sm  bg-[#33383E] border border-none rounded-lg shadow h-1/4">
            <div className="card rounded-lg">
              <div className="uppeer-part bg-white">
                <Image
                  className="w-full h-full object-cover"
                  src={Logo}
                  alt=""
                />
              </div>

              <div className="flex-col gap-3 px-3 py-3 bg-[#33383E]">
                <div className="x">
                  <div className="text-sm">
                    <p className="text-secondaryColor leading-none py-2">
                      Cloud10 VIR points(QRP)
                    </p>
                    <p className="text-sm text-secondaryColor">QBX VIP</p>
                    <div className="flex justify-between py-2 px-0">
                      <span className="text-greyColor text-xs">Regions</span>
                      <span>
                        <div className="text-greyColor  text-xs flex items-center justify-center">
                          Type
                        </div>
                      </span>
                    </div>
                    <div className="flex justify-between py-2 px-0">
                      <span className="text-greyColor text-xs">World wide</span>
                      <span>
                        <div className="text-greyColor  text-xs flex items-center justify-center">
                          Points
                        </div>
                      </span>
                    </div>
                    <p className="text-xs text-secondaryColor py-2  leading-none">
                      Members
                    </p>
                    <p className="text-xs text-secondaryColor py-2">
                      100’000 - 1M
                    </p>
                    <div className="flex items-center gap-2">
                      <button className="bg-btColor  text-secondaryColor py-2 px-2 rounded">
                        Details
                      </button>
                      <button className="bg-btColor text-secondaryColor py-2 px-2 rounded">
                        Website
                      </button>
                      <button className="bg-btColor text-secondaryColor py-2 px-2 rounded">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-sm  bg-[#33383E] border border-none rounded-lg shadow h-1/4">
            <div className="card rounded-lg">
              <div className="uppeer-part bg-white">
                <Image
                  className="w-full h-full object-cover"
                  src={Logo}
                  alt=""
                />
              </div>

              <div className="flex-col gap-3 px-3 py-3 bg-[#33383E]">
                <div className="x">
                  <div className="text-sm">
                    <p className="text-secondaryColor leading-none py-2">
                      Cloud10 VIR points(QRP)
                    </p>
                    <p className="text-sm text-secondaryColor">QBX VIP</p>
                    <div className="flex justify-between py-2 px-0">
                      <span className="text-greyColor text-xs">Regions</span>
                      <span>
                        <div className="text-greyColor  text-xs flex items-center justify-center">
                          Type
                        </div>
                      </span>
                    </div>
                    <div className="flex justify-between py-2 px-0">
                      <span className="text-greyColor text-xs">World wide</span>
                      <span>
                        <div className="text-greyColor  text-xs flex items-center justify-center">
                          Points
                        </div>
                      </span>
                    </div>
                    <p className="text-xs text-secondaryColor py-2  leading-none">
                      Members
                    </p>
                    <p className="text-xs text-secondaryColor py-2">
                      100’000 - 1M
                    </p>
                    <div className="flex items-center gap-2">
                      <button className="bg-btColor  text-secondaryColor py-2 px-2 rounded">
                        Details
                      </button>
                      <button className="bg-btColor text-secondaryColor py-2 px-2 rounded">
                        Website
                      </button>
                      <button className="bg-btColor text-secondaryColor py-2 px-2 rounded">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-sm  bg-[#33383E] border border-none rounded-lg shadow h-1/4">
            <div className="card rounded-lg">
              <div className="uppeer-part bg-white">
                <Image
                  className="w-full h-full object-cover"
                  src={Logo}
                  alt=""
                />
              </div>

              <div className="flex-col gap-3 px-3 py-3 bg-[#33383E]">
                <div className="x">
                  <div className="text-sm">
                    <p className="text-secondaryColor leading-none py-2">
                      Cloud10 VIR points(QRP)
                    </p>
                    <p className="text-sm text-secondaryColor">QBX VIP</p>
                    <div className="flex justify-between py-2 px-0">
                      <span className="text-greyColor text-xs">Regions</span>
                      <span>
                        <div className="text-greyColor  text-xs flex items-center justify-center">
                          Type
                        </div>
                      </span>
                    </div>
                    <div className="flex justify-between py-2 px-0">
                      <span className="text-greyColor text-xs">World wide</span>
                      <span>
                        <div className="text-greyColor  text-xs flex items-center justify-center">
                          Points
                        </div>
                      </span>
                    </div>
                    <p className="text-xs text-secondaryColor py-2  leading-none">
                      Members
                    </p>
                    <p className="text-xs text-secondaryColor py-2">
                      100’000 - 1M
                    </p>
                    <div className="flex items-center gap-2">
                      <button className="bg-btColor  text-secondaryColor py-2 px-2 rounded">
                        Details
                      </button>
                      <button className="bg-btColor text-secondaryColor py-2 px-2 rounded">
                        Website
                      </button>
                      <button className="bg-btColor text-secondaryColor py-2 px-2 rounded">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-sm  bg-[#33383E] border border-none rounded-lg shadow h-1/4">
            <div className="card rounded-lg">
              <div className="uppeer-part bg-white">
                <Image
                  className="w-full h-full object-cover"
                  src={Logo}
                  alt=""
                />
              </div>

              <div className="flex-col gap-3 px-3 py-3 bg-[#33383E]">
                <div className="x">
                  <div className="text-sm">
                    <p className="text-secondaryColor leading-none py-2">
                      Cloud10 VIR points(QRP)
                    </p>
                    <p className="text-sm text-secondaryColor">QBX VIP</p>
                    <div className="flex justify-between py-2 px-0">
                      <span className="text-greyColor text-xs">Regions</span>
                      <span>
                        <div className="text-greyColor  text-xs flex items-center justify-center">
                          Type
                        </div>
                      </span>
                    </div>
                    <div className="flex justify-between py-2 px-0">
                      <span className="text-greyColor text-xs">World wide</span>
                      <span>
                        <div className="text-greyColor  text-xs flex items-center justify-center">
                          Points
                        </div>
                      </span>
                    </div>
                    <p className="text-xs text-secondaryColor py-2  leading-none">
                      Members
                    </p>
                    <p className="text-xs text-secondaryColor py-2">
                      100’000 - 1M
                    </p>
                    <div className="flex items-center gap-2">
                      <button className="bg-btColor  text-secondaryColor py-2 px-2 rounded">
                        Details
                      </button>
                      <button className="bg-btColor text-secondaryColor py-2 px-2 rounded">
                        Website
                      </button>
                      <button className="bg-btColor text-secondaryColor py-2 px-2 rounded">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Marketplace;

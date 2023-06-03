import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="bg-white rounded-md ml-5 mt-4 max-w-screen-lg h-full">
      <div className="flex justify-center items-center p-6">
        <div className="text-center space-y-3 ">
          <h1 className="font-bold text-[40px]">
            pick the perfect <span className="text-blue-700">pricing plan</span>
          </h1>
          <p className="text-sm text-gray-400">
            Just starting your journey? We have the best plan for you.
          </p>
          <button className="bg-blue-800 p-2 text-white mt-5 rounded-md w-[90px]">
            Try Now
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-3 mr-3 mt-5 max-w-screen-lg mx-auto">
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-xl font-bold mb-2">Card 1</h2>
          <p>This is the content for Card 1.</p>
        </div>
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-xl font-bold mb-2">Card 2</h2>
          <p>This is the content for Card 2.</p>
        </div>
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-xl font-bold mb-2">Card 3</h2>
          <p>This is the content for Card 3.</p>
        </div>
      </div>
    </div>
  );
};

export default Page;

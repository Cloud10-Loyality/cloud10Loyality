"use client";

import React from "react";

type Props = {
  onClick?: () => void;
};

const ArrowDown = (props?: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
      />
    </svg>
  );
};

export default ArrowDown;

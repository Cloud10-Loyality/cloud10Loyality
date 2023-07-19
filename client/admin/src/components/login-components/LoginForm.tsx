"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="relative flex flex-col justify-center  drop-shadow-2xl overflow-hidden">
      <div className="w-full p-6 m-auto bg-[#2F2F2F] rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-[#9aa4af] underline">
          Sign in
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-[#6c7a88]"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-[#9aa4af] bg-white border rounded-md focus:border-[#9aa4af] focus:ring-[#9aa4af] focus focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-[#6c7a88]"
            >
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-[#9aa4af] bg-white border rounded-md focus:border-[#9aa4af] focus:ring-[#9aa4af] focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" className="text-xs text-[#6c7a88] hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <Button
              className="w-full text-[#9aa4af]"
              variant={"outline"}
              disabled={isLoading}
            >
              {isLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Login
            </Button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-[#6c7a88]">
          Don't have an account?
          <a href="#" className="font-medium text-[#88939f] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

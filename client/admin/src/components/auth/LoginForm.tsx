"use client";

import React, { useReducer, useState } from "react";
import { RootState, useDispatch, useSelector } from "@/Redux/store";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginAuth } from "@/libs/hooks/use-auth";
import { toast } from "react-toastify";
import { LoginResponse } from "@/app/api/login/route";
import { login as handleLogin, setLoading } from "@/Redux/slices/authSlice";

type Props = {};
export default function Login({}: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { login } = LoginAuth();

  const [isLoading, setIsLoading] = useState(false);

  const { authLoading } = useSelector((state: RootState) => state.authReducer);

  const [inputs, updateInputs] = useReducer(
    (prev: any, next: any) => {
      const updatedInput = { ...prev, ...next };

      return updatedInput;
    },
    {
      username: "",
      password: "",
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await login(inputs);
    if (res.error) {
      toast(res.message || "Login failed, please try again", {
        type: "error",
      });
      return;
    }
    const { data } = res as LoginResponse;
    toast(res.message || "Login successful, redirecting to dashboard...", {
      type: "success",
    });
    await dispatch(handleLogin(data));
  };
  return (
    <div className="relative flex flex-col justify-center  drop-shadow-2xl overflow-hidden">
      <div className="w-full p-6 m-auto bg-[#2F2F2F] rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-[#9aa4af] underline">
          Sign in
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
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
              value={inputs.username}
              onChange={(e) => updateInputs({ username: e.target.value })}
              placeholder="jane.doe@example.com"
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
              value={inputs.password}
              onChange={(e) => updateInputs({ password: e.target.value })}
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
              {authLoading && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Login
            </Button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-[#6c7a88]">
          Don't have an account?
          <Link
            href="/signup"
            className="font-medium text-[#88939f] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

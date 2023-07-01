"use client";

import { LoginResponse } from "@/app/api/login/route";
import { useManager } from "@/libs/hooks/use-manager";
import { login as handleLogin, setLoading } from "@/redux/slices/authSlice";
import { RootState, useDispatch, useSelector } from "@/redux/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useReducer } from "react";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useAuth } from "@/libs/hooks/use-auth";
import { toast } from "react-toastify";

type Props = {};

export default function LoginForm({}: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { login } = useAuth();

  const { authLoading } = useSelector((state: RootState) => state.authReducer);

  const [inputs, updateInputs] = useReducer(
    (prev: any, next: any) => {
      const updatedInput = { ...prev, ...next };

      return updatedInput;
    },
    {
      email: "",
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
    <div>
      <h1 className="font-black text-5xl mb-10">Welcome Back 👋</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-email"
              type="email"
              value={inputs.email}
              onChange={(e) => updateInputs({ email: e.target.value })}
              placeholder="jane.doe@example.com"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              value={inputs.password}
              onChange={(e) => updateInputs({ password: e.target.value })}
              type="password"
              placeholder="******************"
            />
            <p className="text-gray-600 text-xs italic">
              Make it as long and as crazy as you&apos;d like
            </p>
          </div>
        </div>
        <div>
          <Button className="w-full" variant={"default"} disabled={authLoading}>
            {authLoading && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Login
          </Button>
          <p className="text-center text-xs mt-2">
            You&apos;r not already registered,{" "}
            <span
              onClick={() => router.push("/register")}
              className="underline text-indigo-600 cursor-pointer"
            >
              register
            </span>{" "}
            to continue
          </p>
        </div>
      </form>
    </div>
  );
}

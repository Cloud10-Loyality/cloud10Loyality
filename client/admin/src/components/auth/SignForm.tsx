"use client";
import React, { useReducer } from "react";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
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

  const [loading, setLoading] = React.useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post(
      "http://cloud10lms.com/api/v1/admin/auth/signup",
      inputs
    );
    setLoading(false);
    console.log("sign up");

    if (!res.data.error) {
      router.push("/login");
    }
  };

  return (
    <div className="relative flex flex-col justify-center drop-shadow-2xl overflow-hidden">
      <div className="w-full p-6 m-auto bg-[#2F2F2F] rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-[#9aa4af] underline">
          Register
        </h1>
        <form className="mt-6" onSubmit={handleSignUp}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-[#6c7a88]"
            >
              username
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-[#9aa4af] bg-white border rounded-md focus:border-[#9aa4af] focus:ring-[#9aa4af] focus focus:outline-none focus:ring focus:ring-opacity-40"
              value={inputs.username}
              onChange={(e) => updateInputs({ username: e.target.value })}
              required
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
              className="block w-full px-4 py-2 mt-2 text-[#9aa4af] bg-white border rounded-md focus:border-[#9aa4af] focus:ring-[#9aa4af] focus:outline-none focus:ring focus:ring-opacity-40"
              value={inputs.password}
              onChange={(e) => updateInputs({ password: e.target.value })}
              type="password"
              placeholder="******************"
              required
            />
          </div>
          <div className="mt-6">
            <Button
              type="submit"
              className="w-full text-[#9aa4af]"
              variant={"outline"}
              disabled={loading}
            >
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Sign Up
            </Button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-[#6c7a88]">
          Already have an account?
          <Link
            href="/login"
            className="font-medium text-[#88939f] hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

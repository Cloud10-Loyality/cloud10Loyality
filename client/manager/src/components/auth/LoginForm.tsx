"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useReducer } from "react";

type Props = {};

export default function LoginForm({}: Props) {
  const router = useRouter();
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

    const res = await axios.post(
      "http://cloud10lms.com/api/v1/integration/login",
      inputs
    );
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
          <button
            type="submit"
            className="font-bold px-4 py-2 w-full bg-indigo-600 text-white rounded-lg"
          >
            Login
          </button>
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

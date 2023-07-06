"use client";

import React, { useReducer } from "react";

import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {};

export default function RegisterForm({}: Props) {
  const router = useRouter();
  const [inputs, updateInputs] = useReducer(
    (prev: any, next: any) => {
      const updatedInput = { ...prev, ...next };

      return updatedInput;
    },
    {
      name: "",
      username: "",
      email: "",
      password: "",
    }
  );

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const res = await axios.post(
      "http://cloud10lms.com/api/v1/integration/register",
      inputs
    );
    setLoading(false);

    if (!res.data.error) {
      router.push("/login");
    }
  };

  return (
    <div>
      <h1 className="font-black text-5xl">Hello 👋</h1>
      <p className="mt-2 mb-10">
        Kindly register to continue with our services.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-name"
            >
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-name"
              type="text"
              value={inputs.name}
              onChange={(e) => updateInputs({ name: e.target.value })}
              placeholder="Jane Doe"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-username"
            >
              Username
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-username"
              type="text"
              value={inputs.username}
              onChange={(e) => updateInputs({ username: e.target.value })}
              placeholder="Jane"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
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
          <Button disabled={loading} type="submit" className="w-full">
            {loading && <ReloadIcon className="animate-spin" />} Register
          </Button>
          <p className="text-center text-xs mt-2">
            You&apos;r already registered,{" "}
            <span
              onClick={() => router.push("/login")}
              className="underline text-indigo-600 cursor-pointer"
            >
              login
            </span>{" "}
            to continue
          </p>
        </div>
      </form>
    </div>
  );
}

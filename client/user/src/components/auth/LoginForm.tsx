"use client";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { setAccessToken } from "@/Redux/slices/authSlice";
import { useDispatch } from "@/Redux/store";
import { useLogin } from "@/utils/hooks/use-login";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const { login, response } = useLogin();
  const dispatch = useDispatch();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await login({ email });

    if (!response.data || response.data.message === "User not found") {
      toast.error("Incorrect email or password");
      return;
    }

    const accessToken = response.data.accessToken;

    // console.log(response);

    // console.log("This is the accessToken", accessToken);
    dispatch(setAccessToken(accessToken!));
    // localStorage.setItem("accessToken", accessToken!);
    router.push(`/app`);

    toast.success("Login successful");
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <ToastContainer />
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Please login here
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import SignUp from "@/components/auth/SignForm";
import Image from "next/image";
import React from "react";

type Props = {};

export default function LoginPage({}: Props) {
  return (
    <section className="h-screen w-screen flex items-center ">
      <Image
        src="/assets/login-2.jpg"
        alt="Registration Page Illustration"
        className="object-cover object-center"
        fill
      />
      <div className="flex items-center w-screen place-content-center gap-x-48">
        <div className="z-50">
          <Image
            src="/assets/logo.png"
            alt="cloud10 logo"
            height={200}
            width={200}
          />
          <h1 className="text-4xl font-bold drop-shadow-xl shadow-2xl text-white ">
            Welcome to Admin Dashboard
          </h1>
        </div>
        <div className="ml-9">
          <SignUp />
        </div>
      </div>
    </section>
  );
}

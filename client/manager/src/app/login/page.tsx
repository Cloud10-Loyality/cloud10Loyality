import Image from "next/image";
import React from "react";
import login from "./../../../public/illustrations/login.svg";
import RegisterForm from "@/components/auth/RegisterForm";
import LoginForm from "@/components/auth/LoginForm";

type Props = {
  // searchParams: URLSearchParams
};

export default function Page({}: Props) {
  return (
    <section className="h-screen w-screen flex items-center justify-between">
      <div className="w-full flex items-center justify-center">
        <Image
          src={login}
          height={600}
          width={600}
          alt="Registration Page Illustration"
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <LoginForm />
      </div>
    </section>
  );
}

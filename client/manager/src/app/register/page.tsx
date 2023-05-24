import Image from "next/image";
import React from "react";
import register_illustration from "./../../../public/illustrations/register_illustration.svg";
import RegisterForm from "@/components/auth/RegisterForm";

type Props = {
  // searchParams: URLSearchParams
};

export default function Page({}: Props) {
  return (
    <section className="h-screen w-screen flex items-center justify-between">
      <div className="w-full flex items-center justify-center">
        <Image
          src={register_illustration}
          height={600}
          width={600}
          alt="Registration Page Illustration"
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <RegisterForm />
      </div>
    </section>
  );
}

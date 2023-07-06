import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";
import React from "react";

type Props = {};

export default function LoginPage({}: Props) {
  return (
    <section className="h-screen w-screen flex items-center justify-between">
      <div className="w-full h-full relative flex items-center justify-center">
        <Image
          src="/assets/login-bg.jpg"
          // height={600}
          // width={600}
          alt="Registration Page Illustration"
          className="object-cover object-center"
          fill
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <LoginForm />
      </div>
    </section>
  );
}

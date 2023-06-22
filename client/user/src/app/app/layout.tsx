"use client";

import React, { useEffect } from "react";
import { RootState, useSelector } from "@/Redux/store";

import Container from "../../components/container/Container";
import Navbar from "@/components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  const router = useRouter();

  useEffect(() => {
    !accessToken && router.push("/login");
  }, [accessToken]);

  // console.log(accessToken, "accessToken");

  return (
    <Container type="dashboard">
      <Sidebar />
      <Navbar />
      <div className="h-[85vh]  overflow-y-auto overflow-x-auto dark:text-black ">
        {children}
      </div>
    </Container>
  );
}

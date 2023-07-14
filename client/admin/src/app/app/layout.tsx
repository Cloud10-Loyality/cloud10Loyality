"use client";

import React, { useEffect } from "react";
import { RootState, useSelector } from "@/Redux/store";

import Container from "../../components/container/Container";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/ui/Sidebar";
import Navbar from "@/components/ui/Navbar";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
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

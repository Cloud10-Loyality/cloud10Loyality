import Navbar from "@/components/Navbar";
import Container from "../../components/container/Container";
import { Sidebar } from "../../components/Sidebar";
import React from "react";

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

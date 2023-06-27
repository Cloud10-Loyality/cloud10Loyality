import { Container } from "@/components/layout/container";
import { Header } from "@/components/layout/header";
import React from "react";
import { Sidebar } from "@/components/layout/sidebar";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <Container type="dashboard">
      <Sidebar />
      <Header />
      <div className="h-[90vh] py-4 px-6 overflow-y-auto">{children}</div>
    </Container>
  );
}

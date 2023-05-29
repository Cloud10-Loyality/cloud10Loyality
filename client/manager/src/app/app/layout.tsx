import { Container } from "@/components/layout/container";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <Container type="dashboard">
      <Sidebar />
      <Header />
      <div className="h-[90vh] mr-6">{children}</div>
    </Container>
  );
}

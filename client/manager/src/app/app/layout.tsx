"use client";

import { Container } from "@/components/layout/container";
import { Header } from "@/components/layout/header";
import React, { useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { RootState, useDispatch, useSelector } from "@/redux/store";
import { useManager } from "@/libs/hooks/use-manager";
import { useRouter } from "next/navigation";
import { setManager } from "@/redux/slices/authSlice";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const { loading, getManager } = useManager();
  const { accessToken, manager } = useSelector(
    (state: RootState) => state.authReducer
  );
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    !accessToken && router.push("/login");
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      getManager(accessToken).then((res) => {
        dispatch(setManager(res.data?.manager!));
      });
    }
  }, [accessToken]);

  return (
    <Container type="dashboard">
      <Sidebar />
      <Header />
      {!loading && (
        <div className="h-[90vh] py-4 px-6 overflow-y-auto">{children}</div>
      )}
    </Container>
  );
}

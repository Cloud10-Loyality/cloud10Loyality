"use client";

import React, { useEffect } from "react";
import { RootState, useDispatch, useSelector } from "@/Redux/store";

import Container from "../../components/container/Container";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/ui/Sidebar";
import Navbar from "@/components/ui/Navbar";
import useSwr from "swr";
import { encodeStr } from "@/libs/utils";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  useSwr([pathname], replaceURLParams, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
  });

  // console.log({ accessToken, user });

  useEffect(() => {
    !accessToken && router.push("/login");
  }, [accessToken]);

  function replaceURLParams() {
    const query = JSON.stringify({ accessToken });
    const q = encodeStr(query);
    router.push(`${pathname}?q=${q}`);
  }
  return (
    <Container type="dashboard">
      <Sidebar />
      <Navbar />
      <div className="h-[85vh]  overflow-y-auto overflow-x-auto dark:text-white ">
        {children}
      </div>
    </Container>
  );
}

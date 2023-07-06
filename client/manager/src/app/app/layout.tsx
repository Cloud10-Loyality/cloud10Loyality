"use client";

import React, { useEffect } from "react";
import { RootState, useDispatch, useSelector } from "@/redux/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSwr, { mutate } from "swr";

import { Container } from "@/components/layout/container";
import { Header } from "@/components/layout/header";
import { ManagerType } from "../../../types";
import { Sidebar } from "@/components/layout/sidebar";
import { encodeStr } from "@/libs/utils";
import { setManager } from "@/redux/slices/authSlice";
import { useManager } from "@/libs/hooks/use-manager";

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
  const pathname = usePathname();

  const searchParams = useSearchParams();

  useSwr([pathname, manager], replaceURLParams, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
  });

  // console.log(pathname, replaceURLParams);

  useEffect(() => {
    !accessToken && router.push("/login");
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      getManager(accessToken).then((res) => {
        dispatch(setManager(res.data?.manager! as unknown as ManagerType));
      });
    }
  }, [accessToken]);

  function replaceURLParams() {
    const query = JSON.stringify({ accessToken, manager });
    const q = encodeStr(query);
    router.push(`${pathname}?q=${q}`);
  }

  // useEffect(() => {
  // }, [pathname]);

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

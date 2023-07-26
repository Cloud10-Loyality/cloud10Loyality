"use client";

import React, { useEffect } from "react";
import { RootState, useDispatch, useSelector } from "@/Redux/store";
import { User, getProfile } from "@/utils/hooks/use-profile";
import { usePathname, useRouter } from "next/navigation";

import Container from "../../components/container/Container";
import Navbar from "@/components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import { encodeStr } from "@/utils";
import { setUser } from "@/Redux/slices/authSlice";
import useSwr from "swr";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const { accessToken, user } = useSelector(
    (state: RootState) => state.authReducer
  );
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

  useEffect(() => {
    if (accessToken) {
      getProfile(accessToken).then((res) => {
        dispatch(setUser(res));
      });
    }
  }, [accessToken]);

  function replaceURLParams() {
    const query = JSON.stringify({ accessToken, user });
    const q = encodeStr(query);
    router.push(`${pathname}?q=${q}`);
  }

  return (
    <Container type="dashboard">
      <Sidebar />
      <Navbar
        handleLogout={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="h-[90vh] py-4 px-6 overflow-y-auto">{children}</div>
    </Container>
  );
}

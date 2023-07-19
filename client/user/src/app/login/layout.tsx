"use client";

import React, { useEffect } from "react";
import { RootState, useSelector } from "@/Redux/store";

import { encodeStr } from "@/utils";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: Props) {
  const router = useRouter();
  const { accessToken } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    const query = JSON.stringify({ accessToken });
    const q = encodeStr(query);
    if (accessToken) router.push(`/app?q=${q}`);
  }, [accessToken]);

  return <>{children}</>;
}

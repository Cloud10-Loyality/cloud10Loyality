"use client";

import { RootState, useSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: Props) {
  const router = useRouter();
  const { accessToken } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    if (accessToken) router.push("/app/");
  }, [accessToken]);

  return <>{children}</>;
}

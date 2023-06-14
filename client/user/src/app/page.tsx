"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
      // User is logged in, redirect to the main dashboard page
      router.push("/app");
    } else {
      // User is not logged in, redirect to the login page
      router.push("/login");
    }
  };

  return null;
}

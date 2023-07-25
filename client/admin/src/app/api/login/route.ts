import axios from "axios";
import { NextResponse } from "next/server";

export interface LoginResponse {
  message: "error" | "success";
  error: boolean;
  data: {
    accessToken: string;
  };
}

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const res = await axios.post<LoginResponse>(
    "http://cloud10lms.com/api/v1/admin/auth/login",
    { username, password }
  );

  return NextResponse.json({ ...res.data });
}

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
  const { email, password } = await req.json();

  const res = await axios.post<LoginResponse>(
    "http://cloud10lms.com/api/v1/integration/login",
    { email, password }
  );

  return NextResponse.json({ ...res.data });
}

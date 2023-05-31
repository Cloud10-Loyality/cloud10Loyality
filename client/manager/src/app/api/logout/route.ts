import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = await axios.post(
    "http://cloud10lms.com/api/v1/integration/logout"
  );

  return NextResponse.json({ ...res.data });
}

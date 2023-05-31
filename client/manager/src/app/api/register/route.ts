import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await axios.post(
    "http://cloud10lms.com/api/v1/integration/login",
    { email, password }
  );

  console.log(res.data);

  //   return NextResponse.redirect("/app");
}

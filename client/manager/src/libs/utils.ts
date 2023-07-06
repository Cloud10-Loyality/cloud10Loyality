import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ManagerType } from "../../types";
import { Tier } from "@/app/app/tier/page";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodeStr(str: string): string {
  const base64String = btoa(str);
  return base64String;
}

export function decodeStr(encodedStr: string): {
  accessToken?: string;
  manager?: ManagerType;
  tier?: Tier;
} {
  const decodedStr = atob(encodedStr);

  return JSON.parse(decodedStr);
}

import clsx, { ClassValue } from "clsx";

import { User } from "./hooks/use-profile";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodeStr(str: string): string {
  const base64String = btoa(str);
  return base64String;
}

export function decodeStr(encodedStr: string): {
  accessToken?: string;
  user?: User;
  // tier?: Tier;
} {
  const decodedStr = atob(encodedStr);

  return JSON.parse(decodedStr);
}

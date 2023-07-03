import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encodeStr(str: string): string {
  const utf8Encoder = new TextEncoder();
  const utf8Bytes = utf8Encoder.encode(str);

  let binary = "";
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }

  const base64String = btoa(binary);
  return base64String;
}

export function decodeStr(encodedStr: string): string {
  const binary = atob(encodedStr);

  const utf8Bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    utf8Bytes[i] = binary.charCodeAt(i);
  }

  const utf8Decoder = new TextDecoder();
  const decodedStr = utf8Decoder.decode(utf8Bytes);

  return JSON.parse(decodedStr);
}

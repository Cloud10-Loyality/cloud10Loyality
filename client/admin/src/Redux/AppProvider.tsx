"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </Provider>
  );
}

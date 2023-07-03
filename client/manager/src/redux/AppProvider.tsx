"use client";

import { Provider } from "react-redux";
import React from "react";
import { ThemeProvider } from "next-themes";
import { store } from "./store";

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

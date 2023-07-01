"use client";

import React from "react";
import { Provider } from "react-redux";
import { createStore, store } from "./store";
import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
  preloadedState?: any;
};

export default function AppProvider({ children, preloadedState }: Props) {
  const store = createStore(preloadedState);
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </Provider>
  );
}

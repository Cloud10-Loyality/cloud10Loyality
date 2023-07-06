"use client";

import { DarkMode, LightMode } from "../icons";
import React, { useEffect } from "react";

import { useTheme } from "next-themes";

type Props = {};

const ThemeChanger = (props: Props) => {
  const { systemTheme, theme, setTheme } = useTheme();

  console.log(systemTheme);

  useEffect(() => {
    if (typeof window === "undefined") {
      setTheme(JSON.stringify(localStorage.getItem("theme")));
    }
  }, []);

  const handleThemeChange = (t: typeof theme) =>
    setTheme(t === "dark" ? "light" : "dark");

  const showTheme = (t: typeof theme) =>
    t === "dark" || systemTheme === "dark" ? (
      <LightMode onClick={() => handleThemeChange(t)} />
    ) : t === "light" || systemTheme === "light" ? (
      <DarkMode onClick={() => handleThemeChange(t)} />
    ) : null;

  return <div className="cursor-pointer">{showTheme(theme)}</div>;
};

export default ThemeChanger;

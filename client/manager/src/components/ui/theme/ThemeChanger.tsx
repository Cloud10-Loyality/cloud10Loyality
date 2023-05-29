"use client";

import React, { useEffect } from "react";
import { DarkMode, LightMode } from "../icons";
import { useTheme } from "next-themes";

type Props = {};

const ThemeChanger = (props: Props) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setTheme("dark");
  }, []);

  const handleThemeChange = (t: typeof theme) =>
    setTheme(t === "dark" ? "light" : "dark");

  const showTheme = (t: typeof theme) =>
    t === "dark" ? (
      <LightMode onClick={() => handleThemeChange(t)} />
    ) : t === "light" ? (
      <DarkMode onClick={() => handleThemeChange(t)} />
    ) : null;

  return <div className="cursor-pointer">{showTheme(theme)}</div>;
};

export default ThemeChanger;

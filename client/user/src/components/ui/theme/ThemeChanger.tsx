"use client";

import { DarkMode, LightMode } from "../icons";
import { Moon, SunMoon } from "lucide-react";
import React, { useEffect } from "react";

import { Button } from "../button";
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
      <Button variant={"outline"}>
        <SunMoon size={20} onClick={() => handleThemeChange(t)} />
      </Button>
    ) : t === "light" ? (
      <Button variant={"outline"}>
        <Moon size={20} onClick={() => handleThemeChange(t)} />
      </Button>
    ) : null;

  return <div className="cursor-pointer">{showTheme(theme)}</div>;
};

export default ThemeChanger;

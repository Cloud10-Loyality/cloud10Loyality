import React from "react";

type Props = {
  children?: React.ReactNode;
  type?: "dashboard" | "other";
  className?: string;
};

const Container = ({ children, type, className }: Props) => {
  const rootClassname =
    type === "dashboard" ? `grid-container ${className}` : `${className}`;
  return <section className={rootClassname}>{children}</section>;
};

export default Container;

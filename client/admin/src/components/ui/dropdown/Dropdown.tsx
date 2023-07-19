import { useClickOutside } from "@/libs";
import React, { RefObject, ReactNode, ForwardedRef } from "react";

type Props = {
  children: ReactNode;
  closeDropdown?: () => void;
};

const Dropdown = React.forwardRef(
  ({ children, closeDropdown }: Props, dropdownRef: any) => {
    useClickOutside(dropdownRef, closeDropdown!);
    return (
      <div
        className="absolute p-1 bg-primary-light dark:bg-primary-dark border border-border-light dark:border-border-dark bg-opacity-10 backdrop-blur-sm rounded-lg w-full top-[calc(100%_+_6px)] left-0"
        ref={dropdownRef}
      >
        {children}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;

import { useEffect } from "react";

const useClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  close: () => void
) => {
  useEffect(() => {
    const handleCloseOutside = (event: MouseEvent | TouchEvent) => {
      if (ref?.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleCloseOutside);
    document.addEventListener("touchstart", handleCloseOutside);

    return () => {
      document.removeEventListener("mousedown", handleCloseOutside);
      document.removeEventListener("touchstart", handleCloseOutside);
    };
  }, [ref]);
};

export default useClickOutside;

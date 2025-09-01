import { useEffect, useRef } from "react";

export const useOnMount = (callback: () => void) => {
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) {
      return;
    }
    ran.current = true;

    callback();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

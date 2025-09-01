import { useEffect, useRef } from "react";
import { useOnMount } from "./useOnMount";

type DurationLike = { seconds?: number; milliseconds?: number };

export const usePolling = (
  callback: () => void,
  interval: number | DurationLike | null,
  { runOnMount }: { runOnMount: boolean } = { runOnMount: false },
) => {
  const savedCallback = useRef<() => void>(() => null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useOnMount(() => {
    if (runOnMount) {
      callback();
    }
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (interval != null) {
      const intervalMs =
        typeof interval === "number"
          ? interval
          : (interval.seconds ? interval.seconds * 1000 : 0) +
            (interval.milliseconds || 0);
      const id = setInterval(tick, intervalMs);
      return () => clearInterval(id);
    }

    return undefined;
  }, [interval]);
};

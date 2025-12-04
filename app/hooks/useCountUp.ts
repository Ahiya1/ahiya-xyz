"use client";

import { useEffect, useState, useCallback } from "react";

interface UseCountUpOptions {
  duration?: number;
  delay?: number;
  startOnMount?: boolean;
}

export function useCountUp(
  target: number,
  options: UseCountUpOptions = {}
) {
  const { duration = 1500, delay = 0, startOnMount = true } = options;
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const start = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);

    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for natural feel
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(target * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target); // Ensure exact final value
      }
    };

    setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay);
  }, [hasStarted, target, duration, delay]);

  useEffect(() => {
    if (startOnMount) {
      start();
    }
  }, [startOnMount, start]);

  return { count, start, hasStarted };
}

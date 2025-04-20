'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

interface Size {
  width: number;
  height: number;
}

export default function useSize<T extends HTMLElement = HTMLDivElement>(): {
  ref: RefObject<T>;
  width: number;
  height: number;
} {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return { ref, ...size };
}

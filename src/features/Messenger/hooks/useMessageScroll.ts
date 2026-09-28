import { useEffect, useRef } from 'react';

export const useMessageScroll = (id: string, count: number) => {
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  }, [id, count]);

  return end;
};

import { useEffect, useRef } from 'react';

export const useRequestScope = () => {
  const scope = useRef(new AbortController());

  useEffect(() => {
    const controller = new AbortController();
    scope.current = controller;
    return () => controller.abort();
  }, []);
  return scope;
};

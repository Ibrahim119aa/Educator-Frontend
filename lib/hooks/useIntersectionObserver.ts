/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';



const useIntersectionObserver = (options: any): [
  (element: Element | null) => void,
  (element: Element | null) => void,
  IntersectionObserverEntry[]
] => {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((observedEntries) => {
      setEntries(observedEntries);
    }, options);

    return () => observer.current?.disconnect();
  }, [options]);

  const observe = (element: Element | null) => {
    if (element) observer.current?.observe(element);
  };

  const unobserve = (element: Element | null) => {
    if (element) observer.current?.unobserve(element);
  };

  return [observe, unobserve, entries];
};

export default useIntersectionObserver;

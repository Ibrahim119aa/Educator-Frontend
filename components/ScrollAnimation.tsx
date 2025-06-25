import React, { useEffect, useRef, useState, ReactNode } from 'react';
import useIntersectionObserver from '@/lib/hooks/useIntersectionObserver';

interface ScrollAnimationProps {
  children: ReactNode;
  animationClass: string;
  className?: string;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children, animationClass, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [observe, unobserve, entries] = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    const element = ref.current;
    if (element) observe(element);

    return () => {
      if (element) unobserve(element);
    };
  }, [observe, unobserve]);

  useEffect(() => {
    if (entries.length > 0 && entries[0].isIntersecting) {
      setIsVisible(true);
      unobserve(ref.current);
    }
  }, [entries, unobserve]);

  return (
    <>
      {children}
    </>
  );
  return (
    <div ref={ref} className={isVisible ? `${animationClass} visible ${className}` : `${animationClass} ${className}`}>
      {children}
    </div>
  );
};

export default ScrollAnimation;

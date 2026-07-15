import React, { useEffect, useState, useRef } from 'react';

const Counter = ({ targetValue, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Reset animation trigger if targetValue changes
    hasAnimated.current = false;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp = null;
          const endValue = parseFloat(targetValue);
          const startValue = 0;
          
          if (isNaN(endValue)) {
            setCount(targetValue);
            return;
          }

          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = progress * (endValue - startValue) + startValue;
            
            // Handle decimal vs integer
            if (Number.isInteger(endValue)) {
              setCount(Math.floor(currentValue));
            } else {
              setCount(parseFloat(currentValue.toFixed(1)));
            }

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(endValue);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [targetValue, duration]);

  return (
    <span ref={elementRef} className="font-mono">
      {count}
      {suffix}
    </span>
  );
};

export default Counter;

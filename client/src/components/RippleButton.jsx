import React, { useState, useEffect } from 'react';

const RippleButton = ({ children, onClick, className = '', ...props }) => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  const handleClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden cursor-pointer select-none active:scale-[0.98] transition-transform ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/20 pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </button>
  );
};

export default RippleButton;

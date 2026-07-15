import React from 'react';

const RippleButton = ({ children, onClick, className = '' }) => {
  // TODO: Add click event handler that spawns ripple effect circles overlaying the button
  return (
    <button onClick={onClick} className={`relative overflow-hidden ${className}`}>
      {children}
    </button>
  );
};

export default RippleButton;

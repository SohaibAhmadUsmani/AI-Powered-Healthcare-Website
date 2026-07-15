import React from 'react';

const Counter = ({ targetValue, duration = 2000 }) => {
  // TODO: Use requestAnimationFrame or setInterval to animate value increment up to targetValue
  return (
    <span>{targetValue}</span>
  );
};

export default Counter;

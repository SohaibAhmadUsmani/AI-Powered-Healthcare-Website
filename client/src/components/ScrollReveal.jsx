import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ children, delay = 0, duration = 0.6, direction = 'up' }) => {
  const directions = {
    up: { y: 45, x: 0 },
    down: { y: -45, x: 0 },
    left: { x: 45, y: 0 },
    right: { x: -45, y: 0 },
    scale: { scale: 0.95, x: 0, y: 0 }
  };

  const initial = {
    opacity: 0,
    ...directions[direction]
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.16, 1, 0.3, 1]
        }
      }}
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

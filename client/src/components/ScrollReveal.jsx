import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ScrollReveal = ({ children, delay = 0, duration = 0.6, direction = 'up' }) => {
  const shouldReduceMotion = useReducedMotion();

  const directions = {
    up: { y: 45, x: 0 },
    down: { y: -45, x: 0 },
    left: { x: 45, y: 0 },
    right: { x: -45, y: 0 },
    scale: { scale: 0.95, x: 0, y: 0 }
  };

  const initial = shouldReduceMotion 
    ? { opacity: 1, y: 0, x: 0, scale: 1 } 
    : { opacity: 0, ...directions[direction] };

  const animate = shouldReduceMotion 
    ? { opacity: 1, y: 0, x: 0, scale: 1 } 
    : {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.16, 1, 0.3, 1]
        }
      };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type SketchButtonProps = {
  children: ReactNode;
  filled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
};

export default function SketchButton({
  children,
  filled = false,
  type = 'button',
  onClick,
  className = '',
}: Readonly<SketchButtonProps>) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`${filled ? 'aw-btn-primary' : 'aw-btn-secondary'} ${className}`}
    >
      {children}
    </motion.button>
  );
}

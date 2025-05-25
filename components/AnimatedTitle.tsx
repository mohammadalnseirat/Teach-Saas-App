"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ children, className = "" }) => (
  <motion.h1
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.h1>
);

export default AnimatedTitle; 
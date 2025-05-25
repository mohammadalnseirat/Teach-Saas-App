"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = "" }) => (
  <motion.div
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
    className={className}
  >
    {children}
  </motion.div>
);

export default AnimatedSection; 
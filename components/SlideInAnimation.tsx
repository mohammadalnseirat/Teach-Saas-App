// 'use client'

// import { motion } from "framer-motion";
// import { ReactNode } from "react";

// interface SlideInAnimationProps {
//   children: ReactNode;
//   className?: string;
// }

// const SlideInAnimation = ({ children, className }: SlideInAnimationProps) => {
//   return (
//     <motion.div
//       initial={{ x: -100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default SlideInAnimation;

'use client'

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SlideInAnimationProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right'; // default: 'left'
  delay?: number; // optional: customize delay
  duration?: number; // optional: customize duration
}

const SlideInAnimation = ({
  children,
  className,
  direction = "left",
  delay = 1,
  duration = 0.5,
}: SlideInAnimationProps) => {
  const initialX = direction === "left" ? -50 : 50;

  return (
    <motion.div
      initial={{ x: initialX, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideInAnimation;

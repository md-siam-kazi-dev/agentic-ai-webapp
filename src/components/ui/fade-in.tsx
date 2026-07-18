"use client";

/* eslint-disable react-hooks/set-state-in-effect */
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function FadeIn({ children, className, delay = 0, y = 16 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (inView) {
      setRevealed(true);
      return;
    }
    const id = window.setTimeout(() => setRevealed(true), 800);
    return () => window.clearTimeout(id);
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={revealed ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

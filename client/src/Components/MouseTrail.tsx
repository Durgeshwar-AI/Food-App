import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TrailItem = {
  id: number;
  x: number;
  y: number;
  icon: string;
};

const fastFoodIcons = ["🍔", "🍕", "🍟", "🌭", "🥤", "🍗"];

const MouseTrail: React.FC = () => {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const idCounter = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const newItem: TrailItem = {
        id: idCounter.current++,
        x: e.clientX,
        y: e.clientY,
        icon: fastFoodIcons[Math.floor(Math.random() * fastFoodIcons.length)],
      };

      setTrail((prev) => [...prev, newItem]);

      // Remove item after 500ms
      setTimeout(() => {
        setTrail((prev) => prev.filter((item) => item.id !== newItem.id));
      }, 500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            initial={{ scale: 1.2, opacity: 1 }}
            animate={{ scale: 0.8, opacity: 0 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute text-2xl select-none"
            style={{
              left: item.x,
              top: item.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MouseTrail;

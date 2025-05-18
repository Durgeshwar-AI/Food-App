import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define the TrailItem type
type TrailItem = {
  id: number;
  x: number;
  y: number;
  icon: string;
};

// Array of fast food icons
const fastFoodIcons = ["🍔", "🍕", "🍟", "🌭", "🥤", "🍗"];

const MouseTrail = () => {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const idCounter = useRef(0);

  useEffect(() => {
    // Function to check if the mouse is over navbar or footer
    const isOverExcludedElement = (x: number, y: number) => {
      // Get all elements at the current mouse position
      const elements = document.elementsFromPoint(x, y);
      
      // Check if any element has a navbar or footer class/id
      return elements.some(element => {
        const classNames = element.className || "";
        const id = element.id || "";
        
        // Check for common navbar/footer identifiers
        return (
          classNames.includes("navbar") || 
          classNames.includes("nav-") ||
          classNames.includes("footer") || 
          id.includes("navbar") || 
          id.includes("footer") ||
          // Add data attribute support
          element.hasAttribute("data-no-mouse-trail")
        );
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Skip creating trail items when over navbar or footer
      if (isOverExcludedElement(e.clientX, e.clientY)) {
        return;
      }

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
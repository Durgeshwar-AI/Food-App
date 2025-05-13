import React, { useEffect, useRef, useState } from "react";

type TrailItem = {
  id: number;
  x: number;
  y: number;
  icon: string;
  age: number; // increase over time to fade out
};

const fastFoodIcons = ["🍔", "🍕", "🍟", "🌭", "🥤", "🍗"];

const MouseTrail: React.FC = () => {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isMovingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idCounter = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      isMovingRef.current = true;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        isMovingRef.current = false;
      }, 50);
    };

    document.addEventListener("mousemove", handleMouseMove);

    let animationFrame: number;
    const animationLoop = () => {
      setTrail((prev) => {
        let newTrail = [...prev];

        // Remove items that are too old
        newTrail = newTrail.filter((item) => item.age < 1);

        // Update ages
        newTrail = newTrail.map((item) => ({
          ...item,
          age: item.age + 0.05, // controls fade speed
        }));

        // Add new item only if mouse is moving
        if (isMovingRef.current) {
          const newItem: TrailItem = {
            id: idCounter.current++,
            x: mouseRef.current.x,
            y: mouseRef.current.y,
            icon: fastFoodIcons[
              Math.floor(Math.random() * fastFoodIcons.length)
            ],
            age: 0,
          };
          newTrail.push(newItem);
        }

        return newTrail;
      });

      animationFrame = requestAnimationFrame(animationLoop);
    };

    animationLoop();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      {trail.map((item) => (
        <div
          key={item.id}
          className="absolute text-2xl select-none"
          style={{
            left: item.x,
            top: item.y,
            transform: `translate(-50%, -50%) scale(${1 - item.age})`,
            opacity: 1 - item.age,
            transition: "transform 0.1s ease, opacity 0.1s ease",
            transitionDelay: `${item.id * 0.5}s`, // 0.2s delay based on id
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};

export default MouseTrail;

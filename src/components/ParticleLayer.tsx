import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ParticleLayerProps {
  count?: number;
  interactive?: boolean;
}

export default function ParticleLayer({ count = 15, interactive = true }: ParticleLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Create random particles with educational icons or shapes
    const shapes = ["circle", "square", "ring", "star", "plus"];
    const colors = [
      "rgba(244, 197, 66, 0.18)",  // Soft Yellow #F4C542
      "rgba(30, 136, 229, 0.15)",  // Soft Blue #1E88E5
      "rgba(15, 23, 42, 0.08)",    // Subtle Slate
      "rgba(244, 107, 66, 0.10)",  // Warm orange accent
    ];

    const elements: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      const size = Math.floor(Math.random() * 40) + 16; // 16px to 56px
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      el.style.position = "absolute";
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.opacity = `${Math.random() * 0.8 + 0.2}`;
      el.style.pointerEvents = "none";
      el.style.transition = "transform 0.1s ease-out";
      
      // Styling based on shape types
      if (shapeType === "circle") {
        el.style.borderRadius = "50%";
        el.style.backgroundColor = color;
      } else if (shapeType === "ring") {
        el.style.borderRadius = "50%";
        el.style.border = `2px solid ${color}`;
      } else if (shapeType === "square") {
        el.style.borderRadius = "8px";
        el.style.backgroundColor = color;
        el.style.transform = `rotate(${Math.random() * 360}deg)`;
      } else if (shapeType === "star") {
        // Simple star shape using clip path
        el.style.backgroundColor = color;
        el.style.clipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
      } else { // plus
        el.style.backgroundColor = color;
        el.style.clipPath = "polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)";
      }

      container.appendChild(el);
      elements.push(el);

      // Animate each particle gently with GSAP
      gsap.to(el, {
        x: () => (Math.random() - 0.5) * 300,
        y: () => (Math.random() - 0.5) * 300,
        rotation: () => Math.random() * 360,
        duration: Math.random() * 20 + 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Interactive mouse movement parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) / 35;
      const moveY = (clientY - window.innerHeight / 2) / 35;

      elements.forEach((el, index) => {
        const speed = (index % 4) + 1;
        gsap.to(el, {
          xOverride: moveX * speed,
          yOverride: moveY * speed,
          transform: `translate(${moveX * speed}px, ${moveY * speed}px)`,
          duration: 1.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      elements.forEach((el) => {
        try {
          container.removeChild(el);
        } catch (e) {}
      });
    };
  }, [count, interactive]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
    />
  );
}

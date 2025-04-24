"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { cn } from "~/libs/utils";

interface AnimatedGradientBorderProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export function AnimatedGradientBorder({
  children,
  className,
  containerClassName,
}: AnimatedGradientBorderProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative rounded-lg p-[1px] transition-all duration-300",
        isHovered ? "from-primary to-secondary bg-gradient-to-r" : "bg-border",
        containerClassName,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary)), hsl(var(--secondary)))`
          : "",
      }}
    >
      <div
        className={cn("bg-background rounded-[calc(0.5rem-1px)]", className)}
      >
        {children}
      </div>
    </div>
  );
}

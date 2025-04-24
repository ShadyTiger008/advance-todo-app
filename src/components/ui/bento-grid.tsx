"use client";

import type React from "react";

import { cn } from "~/libs/utils";
import { motion } from "framer-motion";

export interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  className?: string;
  title?: string;
  description?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  children,
}: BentoGridItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, staggerChildren: 0.2 }}
      className={cn(
        "bg-card text-card-foreground flex flex-col overflow-hidden rounded-xl border shadow-sm",
        className,
      )}
    >
      {header && <div className="flex-1">{header}</div>}
      <div className="flex flex-col gap-2 p-6">
        {icon && <div className="mb-2">{icon}</div>}
        {title && <h3 className="text-lg font-semibold">{title}</h3>}
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
        {children}
      </div>
    </motion.div>
  );
}

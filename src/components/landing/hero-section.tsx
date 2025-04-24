"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { TypewriterEffect } from "~/components/ui/typewriter-effect";
import { AnimatedGradientBorder } from "~/components/ui/animated-gradient-border";
import { useTheme } from "next-themes";

export function HeroSection() {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [heroImage, setHeroImage] = useState("/dashboard-light.png");

  useEffect(() => {
    const image =
      theme === "dark" ? "/dashboard-dark.png" : "/dashboard-light.png";
    setHeroImage(image);
  }, [theme]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const words = [
    {
      text: "Manage",
    },
    {
      text: "tasks",
      className: "text-primary",
    },
    {
      text: "with",
    },
    {
      text: "TaskFlow",
      className: "text-primary",
    },
    {
      text: "effortlessly.",
    },
  ];

  const features = [
    "Task dependencies",
    "File attachments",
    "Team collaboration",
    "Project management",
    "Rich text notes",
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated background gradient */}
      <div
        className="from-primary/20 via-background to-background absolute inset-0 bg-gradient-to-br opacity-50"
        style={{
          transform: `translate(${mousePosition.x / 50}px, ${mousePosition.y / 50}px)`,
        }}
      />

      {/* Animated circles */}
      <div className="bg-primary/10 absolute top-20 left-10 h-72 w-72 rounded-full blur-3xl" />
      <div className="bg-secondary/10 absolute right-10 bottom-20 h-80 w-80 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="text-primary bg-primary/10 mb-4 inline-block rounded-full px-3 py-1 text-sm font-medium">
              Task Management Reimagined
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 max-w-4xl"
          >
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
              <TypewriterEffect words={words} />
            </h1>
            <p className="text-muted-foreground mb-8 text-xl">
              The all-in-one workspace for your tasks, projects, and team
              collaboration. Streamline your workflow and boost productivity
              with TaskFlow.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 flex flex-col gap-4 sm:flex-row"
          >
            <AnimatedGradientBorder>
              <Button size="lg" className="px-8 text-lg">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </AnimatedGradientBorder>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="px-8 text-lg">
                Sign In
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 flex flex-wrap justify-center gap-4"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background/80 flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium"
              >
                <CheckCircle2 className="text-primary h-4 w-4" />
                {feature}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl"
          >
            <div className="bg-card relative aspect-video overflow-hidden rounded-xl border">
              <img
                src={heroImage}
                alt="TaskFlow Dashboard"
                className="h-full w-full object-fill"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute right-4 bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Beautiful Task Management</h3>
                <p className="text-sm opacity-80">
                  Organize your work with our intuitive interface
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimatedGradientBorder } from "~/components/ui/animated-gradient-border";

export function CtaSection() {
  return (
    <div className="relative overflow-hidden py-24">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
        <div className="bg-primary/20 absolute top-1/4 left-1/4 h-64 w-64 rounded-full blur-3xl" />
        <div className="bg-secondary/20 absolute right-1/3 bottom-1/3 h-64 w-64 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold md:text-5xl">
            Ready to transform your workflow?
          </h2>
          <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-xl">
            Join thousands of teams who use TaskFlow to organize their work,
            collaborate effectively, and achieve their goals.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <AnimatedGradientBorder>
              <Button size="lg" className="px-8 text-lg">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </AnimatedGradientBorder>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="px-8 text-lg">
                Schedule a Demo
              </Button>
            </Link>
          </div>

          <p className="text-muted-foreground mt-6 text-sm">
            No credit card required. Free plan available for teams of any size.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

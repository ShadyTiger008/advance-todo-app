"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Logo } from "~/components/ui/logo";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 py-3 shadow-sm backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="text-xl font-bold">TaskFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="#features"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              FAQ
            </Link>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link href="/auth/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-background border-b md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-4">
                <Link
                  href="#features"
                  className="hover:bg-muted rounded-md p-2 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#pricing"
                  className="hover:bg-muted rounded-md p-2 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="#testimonials"
                  className="hover:bg-muted rounded-md p-2 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Testimonials
                </Link>
                <Link
                  href="#faq"
                  className="hover:bg-muted rounded-md p-2 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <div className="mt-2 flex flex-col gap-2 border-t pt-2">
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

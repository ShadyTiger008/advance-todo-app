"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Checkbox } from "~/components/ui/checkbox";
import { Logo } from "~/components/ui/logo";
import { ArrowLeft, Github, Mail } from "lucide-react";
import { AnimatedGradientBorder } from "~/components/ui/animated-gradient-border";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast("You have successfully logged in.");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-center p-4 md:p-8 lg:p-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <Link
              href="/"
              className="text-muted-foreground hover:text-primary mb-8 inline-flex items-center text-sm font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
            <div className="mb-2 flex items-center gap-2">
              <Logo className="h-8 w-8" />
              <h1 className="text-2xl font-bold">TaskFlow</h1>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground mt-2">
              Enter your credentials to access your account
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 grid gap-4">
              <div className="grid gap-2">
                <AnimatedGradientBorder>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      toast("This would normally redirect to Google OAuth.")
                    }
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Sign in with Google
                  </Button>
                </AnimatedGradientBorder>
              </div>
              <div className="grid gap-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    toast("This would normally redirect to GitHub OAuth.")
                  }
                >
                  <Github className="mr-2 h-4 w-4" />
                  Sign in with GitHub
                </Button>
              </div>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background text-muted-foreground px-2">
                  Or continue with
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name~example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label
                  htmlFor="remember"
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </Label>
              </div>
              <AnimatedGradientBorder>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="mr-3 -ml-1 h-4 w-4 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </AnimatedGradientBorder>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Don't have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Image/Illustration */}
      <div className="from-primary/20 via-primary/5 to-background relative hidden overflow-hidden bg-gradient-to-br md:flex md:w-1/2">
        <div className="bg-grid-white/10 absolute inset-0" />
        <div className="bg-primary/20 absolute top-1/4 left-1/4 h-64 w-64 rounded-full blur-3xl" />
        <div className="bg-secondary/20 absolute right-1/3 bottom-1/3 h-64 w-64 rounded-full blur-3xl" />

        <div className="relative z-10 flex w-full flex-col items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md"
          >
            <div className="bg-card/80 border-border/50 mb-8 rounded-xl border p-6 shadow-lg backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-4">
                <div className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-full">
                  <Mail className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Seamless Collaboration</h3>
                  <p className="text-muted-foreground text-sm">
                    Work together with your team in real-time
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-muted-foreground/20 h-2 w-full rounded-full" />
                <div className="bg-muted-foreground/20 h-2 w-3/4 rounded-full" />
                <div className="bg-muted-foreground/20 h-2 w-1/2 rounded-full" />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                Streamline your workflow with TaskFlow
              </h2>
              <p className="text-muted-foreground">
                Join thousands of teams who use TaskFlow to manage tasks,
                collaborate, and boost productivity.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-primary/20 border-background h-8 w-8 rounded-full border-2"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm">
                  <span className="font-medium">2,500+</span> teams already
                  using TaskFlow
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

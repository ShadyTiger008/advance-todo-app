"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Logo } from "~/components/ui/logo";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { AnimatedGradientBorder } from "~/components/ui/animated-gradient-border";
import { OtpInput } from "~/components/auth/otp-input";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"email" | "otp" | "newPassword" | "success">(
    "email",
  );
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      toast("Please check your email for the verification code.");
    }, 1500);
  };

  const handleVerifyOtp = (otpValue: string) => {
    setOtp(otpValue);
    setIsLoading(true);

    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep("newPassword");
      toast("Please set your new password.");
    }, 1500);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast("Please make sure your passwords match.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
      toast("Your password has been reset successfully.");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link
            href="/auth/login"
            className="text-muted-foreground hover:text-primary mb-8 inline-flex items-center text-sm font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
          <div className="mb-2 flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <h1 className="text-2xl font-bold">TaskFlow</h1>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            Reset your password
          </h2>
          <p className="text-muted-foreground mt-2">
            {step === "email" &&
              "Enter your email to receive a password reset link"}
            {step === "otp" && "Enter the verification code sent to your email"}
            {step === "newPassword" && "Create a new password for your account"}
            {step === "success" && "Your password has been reset successfully"}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {step === "email" && (
            <form onSubmit={handleSendResetLink} className="space-y-4">
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
                      Sending...
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </AnimatedGradientBorder>
            </form>
          )}

          {step === "otp" && (
            <div className="space-y-4">
              <div className="mb-4 text-center">
                <div className="mb-4 flex justify-center">
                  <Mail className="text-primary h-12 w-12" />
                </div>
                <h3 className="text-lg font-medium">Check your email</h3>
                <p className="text-muted-foreground text-sm">
                  We've sent a verification code to{" "}
                  <span className="font-medium">{email}</span>
                </p>
              </div>
              <OtpInput onComplete={handleVerifyOtp} />
              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => setStep("email")}
                  className="text-sm"
                >
                  Change email
                </Button>
              </div>
            </div>
          )}

          {step === "newPassword" && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
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
                      Resetting...
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </AnimatedGradientBorder>
            </form>
          )}

          {step === "success" && (
            <div className="space-y-4 text-center">
              <div className="mb-4 flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <h3 className="text-xl font-medium">Password Reset Successful</h3>
              <p className="text-muted-foreground">
                Your password has been reset successfully. You can now log in
                with your new password.
              </p>
              <AnimatedGradientBorder>
                <Button asChild className="mt-4 w-full">
                  <Link href="/auth/login">Go to Login</Link>
                </Button>
              </AnimatedGradientBorder>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

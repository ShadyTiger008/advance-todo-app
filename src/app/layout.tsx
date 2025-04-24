import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "~/styles/globals.css";
import { ThemeProvider } from "~/components/theme-provider";
import { AppSidebar } from "~/components/app-sidebar";
import { SidebarProvider } from "~/components/ui/sidebar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskFlow - Task Management App",
  description: "Manage your tasks efficiently with TaskFlow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="bg-background flex h-screen overflow-hidden">
              <main className="w-screen flex-1 overflow-auto">{children}</main>
            </div>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

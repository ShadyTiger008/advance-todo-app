import React from "react";
import { AppSidebar } from "~/components/app-sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background flex h-screen overflow-hidden">
      <AppSidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;

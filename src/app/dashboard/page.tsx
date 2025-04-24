import type { Metadata } from "next";
import { DashboardHeader } from "~/components/dashboard/dashboard-header";
import { DashboardStats } from "~/components/dashboard/dashboard-stats";
import { RecentTasks } from "~/components/dashboard/recent-tasks";
import { UpcomingDeadlines } from "~/components/dashboard/upcoming-deadlines";
import { ActivityFeed } from "~/components/dashboard/activity-feed";

export const metadata: Metadata = {
  title: "Dashboard | TaskFlow",
  description: "Task management dashboard",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 w-full">
      <DashboardHeader />
      <DashboardStats />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <RecentTasks />
        <UpcomingDeadlines />
      </div>
      <ActivityFeed />
    </div>
  );
}

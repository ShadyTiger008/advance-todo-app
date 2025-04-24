import type { Metadata } from "next";
import { TasksHeader } from "~/components/tasks/tasks-header";
import { TasksList } from "~/components/tasks/tasks-lists";

export const metadata: Metadata = {
  title: "Tasks | TaskFlow",
  description: "Manage your tasks",
};

export default function TasksPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <TasksHeader />
      <TasksList />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { AddTaskModal } from "~/components/modals/add-task-modal";

export function DashboardHeader() {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your tasks.
          </p>
        </div>
        <Button onClick={() => setIsAddTaskModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <AddTaskModal
        open={isAddTaskModalOpen}
        onOpenChange={setIsAddTaskModalOpen}
      />
    </>
  );
}

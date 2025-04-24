"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Plus, Search, List, Kanban } from "lucide-react";
import { AddTaskModal } from "~/components/modals/add-task-modal";

export function TasksHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isBoard = pathname === "/dashboard/tasks/board";
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">
              Manage and organize your tasks
            </p>
          </div>
          <Button onClick={() => setIsAddTaskModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search tasks..."
              className="w-full pl-8"
            />
          </div>

          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="review">In Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center rounded-md border">
              <Button
                variant={!isBoard ? "default" : "ghost"}
                size="sm"
                className="rounded-r-none"
                onClick={() => router.push("/dashboard/tasks")}
              >
                <List className="h-4 w-4" />
                <span className="sr-only">List View</span>
              </Button>
              <Button
                variant={isBoard ? "default" : "ghost"}
                size="sm"
                className="rounded-l-none"
                onClick={() => router.push("/dashboard/tasks/board")}
              >
                <Kanban className="h-4 w-4" />
                <span className="sr-only">Board View</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AddTaskModal
        open={isAddTaskModalOpen}
        onOpenChange={setIsAddTaskModalOpen}
      />
    </>
  );
}

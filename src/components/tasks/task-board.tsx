"use client";

import { useMemo, useState } from "react";
import type { Task } from "~/types/tasks";
import { TaskCard } from "./task-card";
import { TaskDetailModal } from "./task-detail-drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type TaskBoardProps = {
  tasks: Task[];
  moveTask: (taskId: string, newStatus: string) => void;
};

export function TaskBoard({ tasks, moveTask }: TaskBoardProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openTaskDetail = (task: Task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  const columns = useMemo(() => {
    const statusColumns = {
      "To Do": tasks.filter((task) => task.status === "To Do"),
      "In Progress": tasks.filter((task) => task.status === "In Progress"),
      "In Review": tasks.filter((task) => task.status === "In Review"),
      Completed: tasks.filter((task) => task.status === "Completed"),
    };

    return statusColumns;
  }, [tasks]);

  const statuses = ["To Do", "In Progress", "In Review", "Completed"];

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statuses.map((status) => (
          <div key={status} className="flex h-[calc(100vh-240px)] flex-col">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-medium">{status}</h3>
              <div className="text-muted-foreground text-sm">
                {columns[status].length}
              </div>
            </div>

            <div
              className="bg-muted/40 flex-1 overflow-y-auto rounded-md border p-2"
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                const taskId = e.dataTransfer.getData("taskId");
                moveTask(taskId, status);
              }}
            >
              <div className="flex flex-col gap-2">
                {columns[status].map((task) => (
                  <Dialog key={task.id}>
                    <DialogTrigger>
                      <TaskCard
                        key={task.id}
                        task={task}
                        onClick={() => openTaskDetail(task)}
                      />
                    </DialogTrigger>
                    <DialogContent className="w-11/12">
                      <TaskDetailModal task={task}/>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )} */}
    </>
  );
}

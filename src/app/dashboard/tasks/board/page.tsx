"use client";

import { useState } from "react";
import { TasksHeader } from "~/components/tasks/tasks-header";
import { TaskBoard } from "~/components/tasks/task-board";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { Task } from "~/types/tasks";
import { tasks as initialTasks } from "../../../data/tasks";

export default function BoardPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const moveTask = (taskId: string, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <TasksHeader />
      <DndProvider backend={HTML5Backend}>
        <TaskBoard tasks={tasks} moveTask={moveTask} />
      </DndProvider>
    </div>
  );
}

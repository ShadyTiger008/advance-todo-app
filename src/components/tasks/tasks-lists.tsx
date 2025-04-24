"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { Checkbox } from "~/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Progress } from "~/components/ui/progress";
import { Button } from "~/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { tasks } from "~/app/data/tasks";
import { formatDate, getPriorityColor, getStatusColor } from "~/libs/utils";
import { TaskDetailModal } from "./task-detail-drawer";
import type { Task } from "~/types/tasks";

export function TasksList() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openTaskDetail = (task: Task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                key={task.id}
                className="cursor-pointer"
                onClick={() => openTaskDetail(task)}
              >
                <TableCell>
                  <Checkbox
                    checked={task.status === "Completed"}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{task.title}</div>
                  <div className="text-muted-foreground line-clamp-1 text-sm">
                    {task.description}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getStatusColor(task.status)}
                  >
                    {task.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getPriorityColor(task.priority)}
                  >
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={task.assignee.avatar || "/placeholder.svg"}
                        alt={task.assignee.name}
                      />
                      <AvatarFallback>
                        {task.assignee.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{task.assignee.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{formatDate(task.dueDate)}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={task.progress} className="h-2 w-24" />
                    <span className="text-muted-foreground text-xs">
                      {task.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}
    </>
  );
}

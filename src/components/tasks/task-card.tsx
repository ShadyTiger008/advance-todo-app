"use client";

import type React from "react";

import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Progress } from "~/components/ui/progress";
import { Card, CardContent } from "~/components/ui/card";
import { Clock, CheckSquare } from "lucide-react";
import type { Task } from "~/types/tasks";
import { formatDate, getPriorityColor } from "~/libs/utils";

type TaskCardProps = {
  task: Task;
  onClick: () => void;
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={onClick}
      draggable
      onDragStart={handleDragStart}
    >
      <CardContent className="space-y-2 p-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h4 className="line-clamp-1 text-sm font-medium">{task.title}</h4>
            <div className="flex items-center gap-1">
              <Badge
                variant="outline"
                className={getPriorityColor(task.priority)}
              >
                {task.priority}
              </Badge>
            </div>
          </div>
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={task.assignee.avatar || "/placeholder.svg"}
              alt={task.assignee.name}
            />
            <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>

        <p className="text-muted-foreground line-clamp-2 text-xs">
          {task.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="text-muted-foreground flex items-center gap-1">
              <Progress value={task.progress} className="h-1 w-16" />
              <span>{task.progress}%</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-1">
              <CheckSquare className="h-3 w-3" />
              <span>
                {task.completedSubtasks}/{task.totalSubtasks}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{task.estimatedHours}h</span>
            </div>
            <span className="text-muted-foreground">
              {formatDate(task.dueDate)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

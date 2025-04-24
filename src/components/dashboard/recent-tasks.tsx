import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { tasks } from "~/app/data/tasks";
import { getPriorityColor, getStatusColor } from "~/libs/utils";

export function RecentTasks() {
  // Get the 5 most recent tasks
  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTasks.map((task) => (
            <div key={task.id} className="flex items-start justify-between">
              <div className="space-y-1">
                <Link
                  href={`/dashboard/tasks?id=${task.id}`}
                  className="font-medium hover:underline"
                >
                  {task.title}
                </Link>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={getStatusColor(task.status)}
                  >
                    {task.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={getPriorityColor(task.priority)}
                  >
                    {task.priority}
                  </Badge>
                </div>
              </div>
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={task.assignee.avatar || "/placeholder.svg"}
                  alt={task.assignee.name}
                />
                <AvatarFallback>{task.assignee.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

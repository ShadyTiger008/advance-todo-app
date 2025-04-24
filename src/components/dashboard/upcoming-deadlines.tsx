import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { tasks } from "~/app/data/tasks";
import { formatDate, getPriorityColor } from "~/libs/utils";

export function UpcomingDeadlines() {
  // Get tasks with upcoming deadlines (next 7 days)
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const upcomingTasks = tasks
    .filter((task) => {
      const dueDate = new Date(task.dueDate);
      return (
        dueDate >= today && dueDate <= nextWeek && task.status !== "Completed"
      );
    })
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )
    .slice(0, 5);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingTasks.map((task) => (
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
                    className={getPriorityColor(task.priority)}
                  >
                    {task.priority}
                  </Badge>
                </div>
              </div>
              <div className="text-muted-foreground text-sm">
                {formatDate(task.dueDate)}
              </div>
            </div>
          ))}
          {upcomingTasks.length === 0 && (
            <div className="text-muted-foreground py-4 text-center">
              No upcoming deadlines for the next 7 days
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

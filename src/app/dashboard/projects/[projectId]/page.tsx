"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import {
  Plus,
  Search,
  BarChart,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  Calendar,
  FileText,
  MoreHorizontal,
  Filter,
} from "lucide-react";
import { projects } from "~/data/project";
import { tasks } from "~/data/tasks";
import { formatDate, getPriorityColor, getStatusColor } from "~/libs/utils";
import { AddTaskModal } from "~/components/modals/add-task-modal";
import { TaskDetailModal } from "~/components/tasks/task-detail-drawer";
import type { Task } from "~/types/tasks";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const project = projects.find((p) => p.id === projectId);

  const [activeTab, setActiveTab] = useState("overview");
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);

  // Filter tasks for this project
  const projectTasks = tasks.filter((task) => task.projectId === projectId);

  // Calculate project stats
  const totalTasks = projectTasks.length;
  const completedTasks = projectTasks.filter(
    (task) => task.status === "Completed",
  ).length;
  const inProgressTasks = projectTasks.filter(
    (task) => task.status === "In Progress",
  ).length;
  const overdueTasks = projectTasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate < today && task.status !== "Completed";
  }).length;

  const projectProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const openTaskDetail = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };

  if (!project) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center">
        <h1 className="mb-2 text-2xl font-bold">Project Not Found</h1>
        <p className="text-muted-foreground mb-4">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 w-full">
      <div className="flex items-center justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <div
              className="h-6 w-6 rounded-full"
              style={{ backgroundColor: project.color }}
            ></div>
            <h1 className="text-2xl font-bold tracking-tight">
              {project.name}
            </h1>
          </div>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Users className="mr-2 h-4 w-4" />
            Team
          </Button>
          <Button onClick={() => setIsAddTaskModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tasks
                </CardTitle>
                <BarChart className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalTasks}</div>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-muted-foreground text-xs">
                    Project Progress
                  </p>
                  <p className="text-xs font-medium">{projectProgress}%</p>
                </div>
                <Progress value={projectProgress} className="mt-1 h-1" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedTasks}</div>
                <p className="text-muted-foreground text-xs">
                  {totalTasks > 0
                    ? Math.round((completedTasks / totalTasks) * 100)
                    : 0}
                  % completion rate
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  In Progress
                </CardTitle>
                <Clock className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inProgressTasks}</div>
                <p className="text-muted-foreground text-xs">
                  {totalTasks > 0
                    ? Math.round((inProgressTasks / totalTasks) * 100)
                    : 0}
                  % of total tasks
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                <AlertCircle className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overdueTasks}</div>
                <p className="text-muted-foreground text-xs">
                  {totalTasks > 0
                    ? Math.round((overdueTasks / totalTasks) * 100)
                    : 0}
                  % of total tasks
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Tasks</CardTitle>
                <CardDescription>Latest tasks in this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectTasks.slice(0, 5).map((task) => (
                    <div
                      key={task.id}
                      className="hover:bg-muted/50 flex cursor-pointer items-start justify-between rounded-md p-2"
                      onClick={() => openTaskDetail(task)}
                    >
                      <div className="space-y-1">
                        <div className="font-medium">{task.title}</div>
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
                        <AvatarFallback>
                          {task.assignee.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  People working on this project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "user-1",
                      name: "John Doe",
                      role: "Project Manager",
                      avatar: "/placeholder.svg?height=32&width=32",
                    },
                    {
                      id: "user-2",
                      name: "Jane Smith",
                      role: "Designer",
                      avatar: "/placeholder.svg?height=32&width=32",
                    },
                    {
                      id: "user-3",
                      name: "Bob Johnson",
                      role: "Developer",
                      avatar: "/placeholder.svg?height=32&width=32",
                    },
                    {
                      id: "user-4",
                      name: "Alice Williams",
                      role: "QA Engineer",
                      avatar: "/placeholder.svg?height=32&width=32",
                    },
                  ].map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={member.avatar || "/placeholder.svg"}
                            alt={member.name}
                          />
                          <AvatarFallback>
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-muted-foreground text-sm">
                            {member.role}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-6 space-y-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="w-full pl-8"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button onClick={() => setIsAddTaskModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="text-muted-foreground h-10 px-4 text-left align-middle font-medium">
                    Task
                  </th>
                  <th className="text-muted-foreground h-10 px-4 text-left align-middle font-medium">
                    Status
                  </th>
                  <th className="text-muted-foreground h-10 px-4 text-left align-middle font-medium">
                    Priority
                  </th>
                  <th className="text-muted-foreground h-10 px-4 text-left align-middle font-medium">
                    Assignee
                  </th>
                  <th className="text-muted-foreground h-10 px-4 text-left align-middle font-medium">
                    Due Date
                  </th>
                  <th className="text-muted-foreground h-10 px-4 text-left align-middle font-medium">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody>
                {projectTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-muted/50 cursor-pointer border-b"
                    onClick={() => openTaskDetail(task)}
                  >
                    <td className="p-4">
                      <div className="font-medium">{task.title}</div>
                      <div className="text-muted-foreground line-clamp-1 text-sm">
                        {task.description}
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={getStatusColor(task.status)}
                      >
                        {task.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={getPriorityColor(task.priority)}
                      >
                        {task.priority}
                      </Badge>
                    </td>
                    <td className="p-4">
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
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{formatDate(task.dueDate)}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Progress value={task.progress} className="h-2 w-24" />
                        <span className="text-muted-foreground text-xs">
                          {task.progress}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>
                View project milestones and deadlines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[
                  {
                    date: "2023-04-01",
                    title: "Project Start",
                    description: "Kickoff meeting and initial planning",
                  },
                  {
                    date: "2023-04-15",
                    title: "Design Phase",
                    description: "Complete wireframes and mockups",
                  },
                  {
                    date: "2023-05-01",
                    title: "Development Start",
                    description: "Begin implementation of core features",
                  },
                  {
                    date: "2023-05-15",
                    title: "Mid-project Review",
                    description: "Stakeholder review and feedback",
                  },
                  {
                    date: "2023-06-01",
                    title: "Testing Phase",
                    description: "QA testing and bug fixes",
                  },
                  {
                    date: "2023-06-15",
                    title: "Project Completion",
                    description: "Final delivery and handover",
                  },
                ].map((milestone, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="bg-primary h-3 w-3 rounded-full"></div>
                      {index < 5 && (
                        <div className="bg-border h-full w-0.5"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{milestone.title}</h3>
                        <div className="text-muted-foreground flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(milestone.date)}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Files</CardTitle>
              <CardDescription>
                Documents and files related to this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Project Brief.pdf",
                    type: "pdf",
                    size: "2.4 MB",
                    uploadedBy: "John Doe",
                    date: "2023-04-01T10:30:00Z",
                  },
                  {
                    name: "Design Mockups.zip",
                    type: "zip",
                    size: "15.8 MB",
                    uploadedBy: "Jane Smith",
                    date: "2023-04-10T14:20:00Z",
                  },
                  {
                    name: "Requirements.docx",
                    type: "doc",
                    size: "1.2 MB",
                    uploadedBy: "Bob Johnson",
                    date: "2023-04-15T09:45:00Z",
                  },
                  {
                    name: "Meeting Notes.pdf",
                    type: "pdf",
                    size: "0.8 MB",
                    uploadedBy: "Alice Williams",
                    date: "2023-04-20T16:30:00Z",
                  },
                  {
                    name: "Technical Specs.xlsx",
                    type: "excel",
                    size: "3.5 MB",
                    uploadedBy: "John Doe",
                    date: "2023-04-25T11:15:00Z",
                  },
                ].map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-md">
                        <FileText className="text-muted-foreground h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{file.name}</div>
                        <div className="text-muted-foreground text-xs">
                          {file.size} • Uploaded by {file.uploadedBy}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-muted-foreground text-xs">
                        {formatDate(file.date)}
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddTaskModal
        open={isAddTaskModalOpen}
        onOpenChange={setIsAddTaskModalOpen}
      />

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          open={isTaskDetailOpen}
          onClose={() => setIsTaskDetailOpen(false)}
        />
      )}
    </div>
  );
}

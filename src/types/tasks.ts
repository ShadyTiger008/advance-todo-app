export type User = {
  id: string;
  name: string;
  avatar: string;
};

export type Subtask = {
  id: string;
  title: string;
  completed: boolean;
};

export type Comment = {
  id: string;
  user: User;
  content: string;
  timestamp: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "In Review" | "Completed";
  priority: "Low" | "Medium" | "High" | "Urgent";
  assignee: User;
  collaborators: User[];
  startDate: string;
  dueDate: string;
  estimatedHours: number;
  trackedHours: number;
  progress: number;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  subtasks: Subtask[];
  completedSubtasks: number;
  totalSubtasks: number;
  comments: Comment[];
};

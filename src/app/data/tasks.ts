import type { Task } from "~/types/tasks";

export const tasks: Task[] = [
  {
    id: "task-1",
    title: "Design new dashboard layout",
    description:
      "Create a modern and intuitive dashboard layout for the admin panel. Include widgets for key metrics, recent activity, and quick actions.",
    status: "In Progress",
    priority: "High",
    assignee: {
      id: "user-1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    collaborators: [
      {
        id: "user-2",
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: "user-3",
        name: "Bob Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    startDate: "2023-04-15T00:00:00Z",
    dueDate: "2023-04-22T00:00:00Z",
    estimatedHours: 12,
    trackedHours: 8,
    progress: 65,
    createdAt: "2023-04-14T10:30:00Z",
    updatedAt: "2023-04-18T15:45:00Z",
    projectId: "project-1",
    subtasks: [
      {
        id: "subtask-1",
        title: "Create wireframes",
        completed: true,
      },
      {
        id: "subtask-2",
        title: "Design UI components",
        completed: true,
      },
      {
        id: "subtask-3",
        title: "Implement responsive layout",
        completed: false,
      },
      {
        id: "subtask-4",
        title: "Add dark mode support",
        completed: false,
      },
    ],
    completedSubtasks: 2,
    totalSubtasks: 4,
    comments: [
      {
        id: "comment-1",
        user: {
          id: "user-2",
          name: "Jane Smith",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        content:
          "I've added some reference designs in the shared folder. Take a look when you get a chance.",
        timestamp: "2023-04-16T09:15:00Z",
      },
      {
        id: "comment-2",
        user: {
          id: "user-1",
          name: "John Doe",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        content:
          "Thanks! I'll review them and incorporate the ideas into the design. I'm focusing on the responsive layout today.",
        timestamp: "2023-04-16T10:30:00Z",
      },
    ],
  },
  {
    id: "task-2",
    title: "Implement user authentication",
    description:
      "Set up user authentication system with login, registration, password reset, and email verification. Use JWT for token-based authentication.",
    status: "To Do",
    priority: "Urgent",
    assignee: {
      id: "user-3",
      name: "Bob Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    collaborators: [
      {
        id: "user-4",
        name: "Alice Williams",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    startDate: "2023-04-20T00:00:00Z",
    dueDate: "2023-04-27T00:00:00Z",
    estimatedHours: 16,
    trackedHours: 0,
    progress: 0,
    createdAt: "2023-04-18T14:20:00Z",
    updatedAt: "2023-04-18T14:20:00Z",
    projectId: "project-1",
    subtasks: [
      {
        id: "subtask-5",
        title: "Set up authentication API",
        completed: false,
      },
      {
        id: "subtask-6",
        title: "Create login and registration forms",
        completed: false,
      },
      {
        id: "subtask-7",
        title: "Implement JWT token handling",
        completed: false,
      },
      {
        id: "subtask-8",
        title: "Add email verification",
        completed: false,
      },
    ],
    completedSubtasks: 0,
    totalSubtasks: 4,
    comments: [],
  },
  {
    id: "task-3",
    title: "Optimize database queries",
    description:
      "Review and optimize database queries to improve application performance. Focus on slow queries identified in the performance report.",
    status: "Completed",
    priority: "Medium",
    assignee: {
      id: "user-2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    collaborators: [
      {
        id: "user-1",
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    startDate: "2023-04-10T00:00:00Z",
    dueDate: "2023-04-15T00:00:00Z",
    estimatedHours: 8,
    trackedHours: 6,
    progress: 100,
    createdAt: "2023-04-09T11:00:00Z",
    updatedAt: "2023-04-15T16:30:00Z",
    projectId: "project-2",
    subtasks: [
      {
        id: "subtask-9",
        title: "Analyze performance report",
        completed: true,
      },
      {
        id: "subtask-10",
        title: "Optimize user query",
        completed: true,
      },
      {
        id: "subtask-11",
        title: "Optimize product query",
        completed: true,
      },
      {
        id: "subtask-12",
        title: "Add database indexes",
        completed: true,
      },
    ],
    completedSubtasks: 4,
    totalSubtasks: 4,
    comments: [
      {
        id: "comment-3",
        user: {
          id: "user-2",
          name: "Jane Smith",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        content:
          "I've completed the optimizations. The user query is now 80% faster and the product query is 65% faster.",
        timestamp: "2023-04-15T15:45:00Z",
      },
      {
        id: "comment-4",
        user: {
          id: "user-1",
          name: "John Doe",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        content: "Great work! The performance improvement is significant.",
        timestamp: "2023-04-15T16:20:00Z",
      },
    ],
  },
  {
    id: "task-4",
    title: "Create mobile app wireframes",
    description:
      "Design wireframes for the mobile app version of our platform. Include all key screens and user flows.",
    status: "In Review",
    priority: "High",
    assignee: {
      id: "user-4",
      name: "Alice Williams",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    collaborators: [
      {
        id: "user-1",
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        id: "user-5",
        name: "Charlie Brown",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    startDate: "2023-04-12T00:00:00Z",
    dueDate: "2023-04-19T00:00:00Z",
    estimatedHours: 10,
    trackedHours: 12,
    progress: 90,
    createdAt: "2023-04-11T09:15:00Z",
    updatedAt: "2023-04-18T11:30:00Z",
    projectId: "project-3",
    subtasks: [
      {
        id: "subtask-13",
        title: "Create user flow diagrams",
        completed: true,
      },
      {
        id: "subtask-14",
        title: "Design login and registration screens",
        completed: true,
      },
      {
        id: "subtask-15",
        title: "Design main dashboard",
        completed: true,
      },
      {
        id: "subtask-16",
        title: "Design settings screens",
        completed: false,
      },
    ],
    completedSubtasks: 3,
    totalSubtasks: 4,
    comments: [
      {
        id: "comment-5",
        user: {
          id: "user-4",
          name: "Alice Williams",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        content:
          "I've completed most of the wireframes. Just need to finish the settings screens.",
        timestamp: "2023-04-17T14:20:00Z",
      },
      {
        id: "comment-6",
        user: {
          id: "user-5",
          name: "Charlie Brown",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        content:
          "The wireframes look great! I have a few suggestions for the dashboard layout.",
        timestamp: "2023-04-18T10:15:00Z",
      },
    ],
  },
  {
    id: "task-5",
    title: "Write API documentation",
    description:
      "Create comprehensive documentation for the REST API. Include endpoints, request/response formats, authentication, and examples.",
    status: "To Do",
    priority: "Medium",
    assignee: {
      id: "user-5",
      name: "Charlie Brown",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    collaborators: [
      {
        id: "user-3",
        name: "Bob Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
    startDate: "2023-04-25T00:00:00Z",
    dueDate: "2023-05-02T00:00:00Z",
    estimatedHours: 20,
    trackedHours: 0,
    progress: 0,
    createdAt: "2023-04-18T16:45:00Z",
    updatedAt: "2023-04-18T16:45:00Z",
    projectId: "project-2",
    subtasks: [
      {
        id: "subtask-17",
        title: "Document authentication endpoints",
        completed: false,
      },
      {
        id: "subtask-18",
        title: "Document user endpoints",
        completed: false,
      },
      {
        id: "subtask-19",
        title: "Document product endpoints",
        completed: false,
      },
      {
        id: "subtask-20",
        title: "Create usage examples",
        completed: false,
      },
    ],
    completedSubtasks: 0,
    totalSubtasks: 4,
    comments: [],
  },
];

// Generate more tasks to have a total of 20
for (let i = 6; i <= 20; i++) {
  const statuses = ["To Do", "In Progress", "In Review", "Completed"];
  const priorities = ["Low", "Medium", "High", "Urgent"];
  const users = [
    {
      id: "user-1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "user-2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "user-3",
      name: "Bob Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "user-4",
      name: "Alice Williams",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "user-5",
      name: "Charlie Brown",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomPriority =
    priorities[Math.floor(Math.random() * priorities.length)];
  const randomAssignee = users[Math.floor(Math.random() * users.length)];
  const randomCollaborators = users
    .filter((user) => user.id !== randomAssignee.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3));

  const totalSubtasks = Math.floor(Math.random() * 5) + 1;
  const completedSubtasks =
    randomStatus === "Completed"
      ? totalSubtasks
      : Math.floor(Math.random() * totalSubtasks);

  const progress =
    randomStatus === "Completed"
      ? 100
      : Math.floor((completedSubtasks / totalSubtasks) * 100);

  const subtasks = Array.from({ length: totalSubtasks }, (_, index) => ({
    id: `subtask-${i * 10 + index}`,
    title: `Subtask ${index + 1} for Task ${i}`,
    completed: index < completedSubtasks,
  }));

  const now = new Date();
  const pastDate = new Date(now);
  pastDate.setDate(now.getDate() - Math.floor(Math.random() * 10));

  const futureDate = new Date(now);
  futureDate.setDate(now.getDate() + Math.floor(Math.random() * 14) + 1);

  const startDate = pastDate.toISOString();
  const dueDate = futureDate.toISOString();

  tasks.push({
    id: `task-${i}`,
    title: `Task ${i}`,
    description: `This is a description for Task ${i}. It contains details about what needs to be done.`,
    status: randomStatus,
    priority: randomPriority,
    assignee: randomAssignee,
    collaborators: randomCollaborators,
    startDate,
    dueDate,
    estimatedHours: Math.floor(Math.random() * 20) + 4,
    trackedHours: Math.floor(Math.random() * 15),
    progress,
    createdAt: pastDate.toISOString(),
    updatedAt: new Date(
      pastDate.getTime() + Math.random() * (now.getTime() - pastDate.getTime()),
    ).toISOString(),
    projectId: `project-${Math.floor(Math.random() * 3) + 1}`,
    subtasks,
    completedSubtasks,
    totalSubtasks,
    comments: [],
  });
}

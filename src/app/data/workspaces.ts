import {
  Briefcase,
  Coffee,
  FileText,
  Home,
  Laptop,
  Rocket,
} from "lucide-react";
import type { Workspace } from "~/types/workspace";

export const workspaces: Workspace[] = [
  {
    id: "workspace-1",
    name: "Personal",
    description: "Personal notes and ideas",
    icon: Home,
    color: "#4f46e5",
    noteCount: 12,
  },
  {
    id: "workspace-2",
    name: "Work",
    description: "Work-related notes and documents",
    icon: Briefcase,
    color: "#0ea5e9",
    noteCount: 24,
  },
  {
    id: "workspace-3",
    name: "Projects",
    description: "Project ideas and planning",
    icon: Rocket,
    color: "#10b981",
    noteCount: 8,
  },
  {
    id: "workspace-4",
    name: "Learning",
    description: "Study notes and resources",
    icon: Laptop,
    color: "#f59e0b",
    noteCount: 15,
  },
  {
    id: "workspace-5",
    name: "Journal",
    description: "Daily journal entries",
    icon: FileText,
    color: "#8b5cf6",
    noteCount: 30,
  },
  {
    id: "workspace-6",
    name: "Ideas",
    description: "Creative ideas and brainstorming",
    icon: Coffee,
    color: "#ec4899",
    noteCount: 7,
  },
];

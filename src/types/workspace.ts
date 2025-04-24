import type { LucideIcon } from "lucide-react";

export type Workspace = {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  noteCount: number;
};

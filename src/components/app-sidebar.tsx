"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  LayoutDashboard,
  CheckSquare,
  Kanban,
  FileText,
  FolderKanban,
  Plus,
  Search,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { projects } from "~/app/data/project";
import { workspaces } from "~/app/data/workspaces";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ThemeToggle } from "~/components/theme-toggle";
import { NotificationDropdown } from "~/components/notifications/notification-dropdown";
import { AddProjectModal } from "~/components/modals/add-project-modal";
import { AddWorkspaceModal } from "~/components/modals/add-workspace-modal";
import { AddTaskModal } from "~/components/modals/add-task-modal";

export function AppSidebar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const [isAddWorkspaceModalOpen, setIsAddWorkspaceModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between gap-2 px-2 py-3">
            <div className="flex items-center gap-2">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-md">
                <Kanban className="text-primary-foreground h-4 w-4" />
              </div>
              <div className="font-semibold">TaskFlow</div>
            </div>
            <div className="flex items-center gap-1">
              <NotificationDropdown />
              <ThemeToggle />
            </div>
          </div>
          <div className="px-2 pb-2">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-md border pl-8 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === "/dashboard"}
                  >
                    <Link href="/dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Tasks</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === "/dashboard/tasks"}
                  >
                    <Link href="/dashboard/tasks">
                      <CheckSquare className="h-4 w-4" />
                      <span>List View</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === "/dashboard/tasks/board"}
                  >
                    <Link href="/dashboard/tasks/board">
                      <Kanban className="h-4 w-4" />
                      <span>Board View</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setIsAddTaskModalOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Task</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between pr-2">
              <span>Projects</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={() => setIsAddProjectModalOpen(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        pathname === `/dashboard/projects/${project.id}`
                      }
                    >
                      <Link href={`/dashboard/projects/${project.id}`}>
                        <FolderKanban
                          className="h-4 w-4"
                          style={{ color: project.color }}
                        />
                        <span>{project.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between pr-2">
              <span>Notes</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={() => setIsAddWorkspaceModalOpen(true)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === "/dashboard/notes"}
                  >
                    <Link href="/dashboard/notes">
                      <FileText className="h-4 w-4" />
                      <span>All Notes</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {workspaces.map((workspace) => (
                  <SidebarMenuItem key={workspace.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === `/dashboard/notes/${workspace.id}`}
                    >
                      <Link href={`/dashboard/notes/${workspace.id}`}>
                        <workspace.icon
                          className="h-4 w-4"
                          style={{ color: workspace.color }}
                        />
                        <span>{workspace.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="px-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start px-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="User"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 items-center justify-between">
                      <span className="text-sm font-medium">John Doe</span>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>

      <AddProjectModal
        open={isAddProjectModalOpen}
        onOpenChange={setIsAddProjectModalOpen}
      />
      <AddWorkspaceModal
        open={isAddWorkspaceModalOpen}
        onOpenChange={setIsAddWorkspaceModalOpen}
      />
      <AddTaskModal
        open={isAddTaskModalOpen}
        onOpenChange={setIsAddTaskModalOpen}
      />
    </>
  );
}

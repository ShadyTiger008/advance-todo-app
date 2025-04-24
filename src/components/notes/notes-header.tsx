"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Plus, Search } from "lucide-react";
import type { Workspace } from "~/types/workspace";
import { AddWorkspaceModal } from "~/components/modals/add-workspace-modal";

type NotesHeaderProps = {
  workspace?: Workspace;
};

export function NotesHeader({ workspace }: NotesHeaderProps) {
  const [isAddWorkspaceModalOpen, setIsAddWorkspaceModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {workspace ? workspace.name : "Notes"}
            </h1>
            <p className="text-muted-foreground">
              {workspace
                ? `Notes in ${workspace.name} workspace`
                : "Manage and organize your notes"}
            </p>
          </div>
          <Button onClick={() => setIsAddWorkspaceModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {workspace ? "New Note" : "New Workspace"}
          </Button>
        </div>

        <div className="relative">
          <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search notes..."
            className="w-full pl-8"
          />
        </div>
      </div>

      <AddWorkspaceModal
        open={isAddWorkspaceModalOpen}
        onOpenChange={setIsAddWorkspaceModalOpen}
      />
    </>
  );
}

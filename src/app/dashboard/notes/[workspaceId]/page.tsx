"use client";

import { useParams } from "next/navigation";
import { NotesHeader } from "~/components/notes/notes-header";
import { NotesList } from "~/components/notes/notes-list";
import { workspaces } from "~/data/workspaces";

export default function WorkspaceNotesPage() {
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  const workspace = workspaces.find((w) => w.id === workspaceId);

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <NotesHeader workspace={workspace} />
      <NotesList workspaceId={workspaceId} />
    </div>
  );
}

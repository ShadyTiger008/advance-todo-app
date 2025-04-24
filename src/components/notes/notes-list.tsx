"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { notes } from "~/app/data/notes";
import { workspaces } from "~/app/data/workspaces";
import { formatRelativeTime } from "~/libs/utils";
import { useRouter } from "next/navigation";
// import { NoteEditor } from "./note-editor";

type NotesListProps = {
  workspaceId: string;
};

export function NotesList({ workspaceId }: NotesListProps) {
  const router = useRouter();
  const workspaceNotes = notes.filter(
    (note) => note.workspaceId === workspaceId,
  );
  const workspace = workspaces.find((w) => w.id === workspaceId);

  const [selectedNote, setSelectedNote] = useState<(typeof notes)[0] | null>(
    null,
  );
  const [isNoteEditorOpen, setIsNoteEditorOpen] = useState(false);

  const openNoteEditor = (note: (typeof notes)[0]) => {
    setSelectedNote(note);
    setIsNoteEditorOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {workspaceNotes.map((note) => (
          <Card
            key={note.id}
            className="h-full cursor-pointer transition-shadow hover:shadow-md"
            onClick={() => router.push(`/dashboard/notes/note/${note.id}`)}
          >
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="line-clamp-1 font-semibold">{note.title}</h3>
                  {workspace && (
                    <Badge
                      variant="outline"
                      style={{
                        color: workspace.color,
                        borderColor: workspace.color,
                      }}
                    >
                      {workspace.name}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground line-clamp-3 text-sm">
                  {note.content}
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <span className="text-muted-foreground text-xs">
                Updated {formatRelativeTime(note.updatedAt)}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* <NoteEditor
        note={selectedNote}
        open={isNoteEditorOpen}
        onClose={() => setIsNoteEditorOpen(false)}
      /> */}
    </>
  );
}

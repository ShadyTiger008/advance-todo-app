import NoteEditorPage from "~/components/notes/note-editor";
// import { getNoteById } from "~/libs/note-service";

export default async function NoteEditor({
  params,
}: {
  params: { id: string };
}) {
  //   const note = await getNoteById(params.id);

  var note = {
    id: "note-1",
    title: "Meeting Notes: Product Team",
    content:
      "Discussed upcoming features for Q2. Key points: 1) Implement user dashboard, 2) Improve onboarding flow, 3) Add export functionality.",
    workspaceId: "workspace-2",
    createdAt: "2023-04-10T09:30:00Z",
    updatedAt: "2023-04-10T11:15:00Z",
  };

  return <NoteEditorPage note={note} />;
}

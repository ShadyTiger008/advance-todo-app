import type { Metadata } from "next";
import { NotesHeader } from "~/components/notes/notes-header";
import { NotesGrid } from "~/components/notes/notes-grid";

export const metadata: Metadata = {
  title: "Notes | TaskFlow",
  description: "Manage your notes",
};

export default function NotesPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 overflow-scroll">
      <NotesHeader />
      <NotesGrid />
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  ImageIcon,
  Link,
  Save,
  MoreHorizontal,
  ChevronLeft,
  FileText,
  Clock,
  Tag,
} from "lucide-react";
import { workspaces } from "~/data/workspaces";
import { formatRelativeTime } from "~/libs/utils";
import { toast } from "sonner";

type Note = {
  id: string;
  title: string;
  content: string;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
};

type NoteEditorProps = {
  note: Note;
};

export default function NoteEditor({ note }: NoteEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const workspace = workspaces.find((w) => w.id === note.workspaceId);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      if (editorRef.current) {
        editorRef.current.innerHTML = note.content;
      }
    }
  }, [note]);

  const handleSave = () => {
    const editorContent = editorRef.current?.innerHTML || "";
    toast("Your note has been saved.");
    // Save to DB logic goes here
    router.back(); // navigate back after saving
  };

  const handleExport = (format: "pdf" | "markdown" | "html") => {
    toast(`Note exported as ${format.toUpperCase()}`);
  };

  const formatText = (command: string, value = "") => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  return (
    <div className="flex h-screen w-full flex-col">
      {/* Header */}
      <div className="bg-background sticky top-0 z-10 flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
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
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <Clock className="h-3 w-3" />
            <span>Last edited {formatRelativeTime(note.updatedAt)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Avatar className="border-background h-6 w-6 border-2">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Avatar className="border-background -ml-2 h-6 w-6 border-2">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="mr-1 h-4 w-4" />
            Save
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 overflow-x-auto border-b p-2">
        <Button variant="ghost" size="icon" onClick={() => formatText("bold")}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => formatText("italic")}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => formatText("underline")}
        >
          <Underline className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-6 border-l" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => formatText("insertUnorderedList")}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => formatText("insertOrderedList")}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => formatText("formatBlock", "<blockquote>")}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-6 border-l" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            const url = prompt("Enter image URL:");
            if (url) formatText("insertImage", url);
          }}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            const url = prompt("Enter link URL:");
            if (url) formatText("createLink", url);
          }}
        >
          <Link className="h-4 w-4" />
        </Button>
        <div className="mx-1 h-6 border-l" />
        <Button variant="ghost" size="sm" onClick={() => handleExport("pdf")}>
          <FileText className="mr-1 h-4 w-4" />
          Export
        </Button>
        <Button variant="ghost" size="sm">
          <Tag className="mr-1 h-4 w-4" />
          Tags
        </Button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto w-full max-w-5xl">
          <Input
            type="text"
            placeholder="Title"
            className="mb-4 border-none px-0 text-3xl font-bold focus-visible:ring-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div
            ref={editorRef}
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl min-h-[500px] max-w-none focus:outline-none"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
            aria-placeholder="Start writing..."
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Progress } from "~/components/ui/progress";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Calendar,
  Edit,
  MoreHorizontal,
  Plus,
  Save,
  Tag,
  Users,
  FileText,
  Download,
  Paperclip,
  X,
  ArrowDown,
  ArrowUp,
  FileImage,
  FileArchive,
  FileIcon as FilePdf,
  FileCode,
  FileIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Calendar as CalendarComponent } from "~/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { format } from "date-fns";
import type { Task } from "~/types/tasks";
import { formatDate, getStatusColor } from "~/libs/utils";
import { cn } from "~/libs/utils";
import { tasks } from "~/app/data/tasks";
import { toast } from "sonner";

type TaskDetailModalProps = {
  task: Task;
  open: boolean;
  onClose: () => void;
};

type Attachment = {
  id: string;
  name: string;
  size: string;
  type: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
};

type HistoryItem = {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  action: string;
  field?: string;
  oldValue?: string;
  newValue?: string;
  timestamp: string;
};

export function TaskDetailModal({ task, open, onClose }: TaskDetailModalProps) {
  const [comment, setComment] = useState("");
  const [newSubtask, setNewSubtask] = useState("");
  const [newSubtaskAssignee, setNewSubtaskAssignee] = useState("");
  const [newSubtaskDueDate, setNewSubtaskDueDate] = useState<Date | undefined>(
    undefined,
  );
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [selectedDependencyTask, setSelectedDependencyTask] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample attachments data
  const [attachments, setAttachments] = useState<Attachment[]>([
    {
      id: "att-1",
      name: "requirements.pdf",
      size: "2.4 MB",
      type: "pdf",
      url: "#",
      uploadedBy: "John Doe",
      uploadedAt: "2023-04-16T10:30:00Z",
    },
    {
      id: "att-2",
      name: "mockup.png",
      size: "1.8 MB",
      type: "image",
      url: "#",
      uploadedBy: "Jane Smith",
      uploadedAt: "2023-04-17T14:20:00Z",
    },
  ]);

  // Sample dependencies data
  const [dependencies, setDependencies] = useState<
    { id: string; type: "blocks" | "blocked-by" }[]
  >([
    { id: "task-3", type: "blocks" },
    { id: "task-5", type: "blocked-by" },
  ]);

  // Sample history data
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "hist-1",
      user: {
        id: "user-1",
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "changed",
      field: "status",
      oldValue: "To Do",
      newValue: "In Progress",
      timestamp: "2023-04-16T09:15:00Z",
    },
    {
      id: "hist-2",
      user: {
        id: "user-2",
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "added",
      field: "subtask",
      newValue: "Design UI components",
      timestamp: "2023-04-15T14:30:00Z",
    },
    {
      id: "hist-3",
      user: {
        id: "user-1",
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "updated",
      field: "description",
      timestamp: "2023-04-14T11:20:00Z",
    },
    {
      id: "hist-4",
      user: {
        id: "user-3",
        name: "Bob Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      action: "added",
      field: "attachment",
      newValue: "requirements.pdf",
      timestamp: "2023-04-13T16:45:00Z",
    },
  ]);

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

  const handleAddSubtask = () => {
    // Here you would normally add the subtask to the database
    // For now, we'll just reset the form
    setNewSubtask("");
    setNewSubtaskAssignee("");
    setNewSubtaskDueDate(undefined);
    setIsAddingSubtask(false);

    toast("The subtask has been added successfully.");
  };

  const handleAddComment = () => {
    // Here you would normally add the comment to the database
    // For now, we'll just reset the form
    setComment("");

    toast("Your comment has been added successfully.");
  };

  const handleAddDependency = () => {
    if (!selectedDependencyTask) return;

    // Check if dependency already exists
    if (dependencies.some((dep) => dep.id === selectedDependencyTask)) {
      toast("This task is already in the dependencies list.");
      return;
    }

    setDependencies([
      ...dependencies,
      { id: selectedDependencyTask, type: "blocks" },
    ]);
    setSelectedDependencyTask("");

    toast("The task dependency has been added successfully.");
  };

  const handleRemoveDependency = (id: string) => {
    setDependencies(dependencies.filter((dep) => dep.id !== id));

    toast("The task dependency has been removed successfully.");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // In a real app, you would upload the file to your server/storage
    // For now, we'll just add it to our attachments array
    const newAttachments: Attachment[] = Array.from(files).map(
      (file, index) => ({
        id: `new-att-${Date.now()}-${index}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        type: file.type.split("/")[0],
        url: "#",
        uploadedBy: "You",
        uploadedAt: new Date().toISOString(),
      }),
    );

    setAttachments([...newAttachments, ...attachments]);

    toast(`${files.length} file(s) have been uploaded successfully.`);

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(attachments.filter((att) => att.id !== id));

    toast("The attachment has been removed successfully.");
  };

  const handleExportTask = (format: "pdf" | "csv" | "json") => {
    // In a real app, you would generate and download the file
    // For now, we'll just show a toast
    toast(`The task has been exported as ${format.toUpperCase()}.`);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <FileImage className="h-4 w-4" />;
      case "pdf":
        return <FilePdf className="h-4 w-4" />;
      case "archive":
        return <FileArchive className="h-4 w-4" />;
      case "code":
        return <FileCode className="h-4 w-4" />;
      default:
        return <FileIcon className="h-4 w-4" />;
    }
  };

  const getDependencyTask = (id: string) => {
    return tasks.find((t) => t.id === id) || null;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex h-[90vh] max-h-[90vh] max-w-6xl flex-col p-0">
        <div className="flex h-full">
          {/* Left side - 75% - Task details */}
          <div className="w-3/4 overflow-auto">
            <div className="bg-background sticky top-0 z-10 border-b p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">{task.title}</h2>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1 h-4 w-4" />
                        Export
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48" align="end">
                      <div className="flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start"
                          onClick={() => handleExportTask("pdf")}
                        >
                          <FilePdf className="mr-2 h-4 w-4" />
                          Export as PDF
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start"
                          onClick={() => handleExportTask("csv")}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Export as CSV
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start"
                          onClick={() => handleExportTask("json")}
                        >
                          <FileCode className="mr-2 h-4 w-4" />
                          Export as JSON
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="subtasks">Subtasks</TabsTrigger>
                  <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Attachments section - shown at the top if there are attachments */}
            {attachments.length > 0 && (
              <div className="bg-muted/20 border-b p-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-medium">
                    Attachments ({attachments.length})
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Files
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    onChange={handleFileUpload}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="bg-card flex items-start rounded-md border p-3"
                    >
                      <div className="bg-muted mr-3 flex h-10 w-10 items-center justify-center rounded-md">
                        {getFileIcon(attachment.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="truncate text-sm font-medium">
                            {attachment.name}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              handleRemoveAttachment(attachment.id)
                            }
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-muted-foreground mt-1 flex items-center text-xs">
                          <span className="truncate">{attachment.size}</span>
                          <span className="mx-1">•</span>
                          <span>{formatDate(attachment.uploadedAt)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <TabsContent value="details" className="mt-0 space-y-6 p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                      Status
                    </h3>
                    <Select defaultValue={task.status}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="To Do">To Do</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="In Review">In Review</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                      Priority
                    </h3>
                    <Select defaultValue={task.priority}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                      Assignee
                    </h3>
                    <Select defaultValue={task.assignee.id}>
                      <SelectTrigger className="w-full">
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage
                                src={task.assignee.avatar || "/placeholder.svg"}
                                alt={task.assignee.name}
                              />
                              <AvatarFallback>
                                {task.assignee.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {task.assignee.name}
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-5 w-5">
                                <AvatarImage
                                  src={user.avatar || "/placeholder.svg"}
                                  alt={user.name}
                                />
                                <AvatarFallback>
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              {user.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                      Start Date
                    </h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {formatDate(task.startDate)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={new Date(task.startDate)}
                          onSelect={() => {}}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                      Due Date
                    </h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {formatDate(task.dueDate)}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={new Date(task.dueDate)}
                          onSelect={() => {}}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                      Estimated Hours
                    </h3>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        defaultValue={task.estimatedHours}
                        className="w-20"
                      />
                      <span className="text-muted-foreground text-sm">
                        hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-muted-foreground mb-1 text-sm font-medium">
                  Description
                </h3>
                <Textarea
                  defaultValue={task.description}
                  className="min-h-[120px] resize-none"
                />
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-muted-foreground text-sm font-medium">
                    Progress
                  </h3>
                  <span className="text-sm font-medium">{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-2" />
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="hover:bg-muted cursor-pointer"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    Frontend
                  </Badge>
                  <Badge
                    variant="outline"
                    className="hover:bg-muted cursor-pointer"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    Design
                  </Badge>
                  <Badge
                    variant="outline"
                    className="hover:bg-muted cursor-pointer"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    UI/UX
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <Plus className="mr-1 h-3 w-3" />
                    Add Tag
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium">Attachments</h3>
                {attachments.length === 0 ? (
                  <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-6">
                    <div className="text-center">
                      <div className="mb-2 flex justify-center">
                        <Paperclip className="text-muted-foreground h-8 w-8" />
                      </div>
                      <p className="text-muted-foreground mb-2 text-sm">
                        Drag and drop files here or click to browse
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Add Files
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        multiple
                        onChange={handleFileUpload}
                      />
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add More Files
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="subtasks" className="mt-0 space-y-6 p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-medium">
                  Subtasks ({task.completedSubtasks}/{task.totalSubtasks})
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddingSubtask(true)}
                  className={isAddingSubtask ? "hidden" : ""}
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Subtask
                </Button>
              </div>

              {isAddingSubtask && (
                <div className="bg-muted/30 mb-4 rounded-lg p-4">
                  <h4 className="mb-3 font-medium">New Subtask</h4>
                  <div className="space-y-3">
                    <div>
                      <Input
                        placeholder="Subtask title"
                        value={newSubtask}
                        onChange={(e) => setNewSubtask(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Select
                          value={newSubtaskAssignee}
                          onValueChange={setNewSubtaskAssignee}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Assignee" />
                          </SelectTrigger>
                          <SelectContent>
                            {users.map((user) => (
                              <SelectItem key={user.id} value={user.id}>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-5 w-5">
                                    <AvatarImage
                                      src={user.avatar || "/placeholder.svg"}
                                      alt={user.name}
                                    />
                                    <AvatarFallback>
                                      {user.name.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  {user.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {newSubtaskDueDate
                                ? format(newSubtaskDueDate, "PPP")
                                : "Due date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={newSubtaskDueDate}
                              onSelect={setNewSubtaskDueDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-sm font-medium">Attachments</h3>
                      <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-4">
                        <div className="text-center">
                          <p className="text-muted-foreground mb-2 text-sm">
                            Drag and drop files here or click to browse
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Plus className="mr-1 h-4 w-4" />
                            Add Files
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAddingSubtask(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleAddSubtask}
                        disabled={!newSubtask.trim()}
                      >
                        <Save className="mr-1 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="max-h-[500px] space-y-2 overflow-y-auto">
                {task.subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className={cn(
                      "flex items-start gap-3 rounded-md p-3",
                      subtask.completed ? "bg-muted/30" : "hover:bg-muted/20",
                    )}
                  >
                    <Checkbox
                      id={subtask.id}
                      checked={subtask.completed}
                      className="mt-1"
                    />
                    <div className="min-w-0 flex-1">
                      <label
                        htmlFor={subtask.id}
                        className={cn(
                          "leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                          subtask.completed
                            ? "text-muted-foreground line-through"
                            : "",
                        )}
                      >
                        {subtask.title}
                      </label>
                      <div className="text-muted-foreground mt-2 flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>John Doe</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Apr 22, 2023</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Paperclip className="h-3 w-3" />
                          <span>2 files</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="dependencies" className="mt-0 space-y-6 p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-3 text-sm font-medium">Add Dependency</h3>
                  <div className="flex gap-2">
                    <Select
                      value={selectedDependencyTask}
                      onValueChange={setSelectedDependencyTask}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select a task" />
                      </SelectTrigger>
                      <SelectContent>
                        {tasks
                          .filter((t) => t.id !== task.id)
                          .map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.title}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={handleAddDependency}
                      disabled={!selectedDependencyTask}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-medium">This task blocks</h3>
                  {dependencies.filter((d) => d.type === "blocks").length >
                  0 ? (
                    <div className="space-y-2">
                      {dependencies
                        .filter((d) => d.type === "blocks")
                        .map((dep) => {
                          const depTask = getDependencyTask(dep.id);
                          if (!depTask) return null;

                          return (
                            <div
                              key={dep.id}
                              className="flex items-center justify-between rounded-md border p-3"
                            >
                              <div className="flex items-center gap-2">
                                <ArrowDown className="h-4 w-4 text-red-500" />
                                <span>{depTask.title}</span>
                                <Badge
                                  variant="outline"
                                  className={getStatusColor(depTask.status)}
                                >
                                  {depTask.status}
                                </Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleRemoveDependency(dep.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-sm">
                      No tasks are blocked by this task.
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-medium">
                    This task is blocked by
                  </h3>
                  {dependencies.filter((d) => d.type === "blocked-by").length >
                  0 ? (
                    <div className="space-y-2">
                      {dependencies
                        .filter((d) => d.type === "blocked-by")
                        .map((dep) => {
                          const depTask = getDependencyTask(dep.id);
                          if (!depTask) return null;

                          return (
                            <div
                              key={dep.id}
                              className="flex items-center justify-between rounded-md border p-3"
                            >
                              <div className="flex items-center gap-2">
                                <ArrowUp className="h-4 w-4 text-blue-500" />
                                <span>{depTask.title}</span>
                                <Badge
                                  variant="outline"
                                  className={getStatusColor(depTask.status)}
                                >
                                  {depTask.status}
                                </Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleRemoveDependency(dep.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-sm">
                      This task is not blocked by any tasks.
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-0 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Activity History</h3>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Activity</SelectItem>
                      <SelectItem value="status">Status Changes</SelectItem>
                      <SelectItem value="comments">Comments</SelectItem>
                      <SelectItem value="attachments">Attachments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="max-h-[500px] space-y-4 overflow-y-auto">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="hover:bg-muted/20 flex gap-3 rounded-md p-3"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={item.user.avatar || "/placeholder.svg"}
                          alt={item.user.name}
                        />
                        <AvatarFallback>
                          {item.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">
                            {item.user.name}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            {item.action} {item.field}
                          </span>
                        </div>

                        {item.oldValue && item.newValue && (
                          <div className="flex items-center gap-2 text-sm">
                            <Badge variant="outline" className="bg-muted/50">
                              {item.oldValue}
                            </Badge>
                            <span className="text-muted-foreground">→</span>
                            <Badge variant="outline">{item.newValue}</Badge>
                          </div>
                        )}

                        {!item.oldValue && item.newValue && (
                          <div className="text-sm">
                            {item.field === "attachment" ? (
                              <div className="flex items-center gap-2">
                                <Paperclip className="h-3 w-3" />
                                <span>{item.newValue}</span>
                              </div>
                            ) : (
                              <span>{item.newValue}</span>
                            )}
                          </div>
                        )}

                        <p className="text-muted-foreground text-xs">
                          {formatDate(item.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>

          {/* Right side - 25% - Comments and activity */}
          <div className="flex h-full w-1/4 flex-col border-l">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="font-medium">Activity</h3>
              <Select defaultValue="all">
                <SelectTrigger className="h-8 w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activity</SelectItem>
                  <SelectItem value="comments">Comments</SelectItem>
                  <SelectItem value="changes">Changes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-6">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={task.assignee.avatar || "/placeholder.svg"}
                      alt={task.assignee.name}
                    />
                    <AvatarFallback>
                      {task.assignee.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">
                        {task.assignee.name}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        changed status
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline" className="bg-muted/50">
                        To Do
                      </Badge>
                      <span className="text-muted-foreground">→</span>
                      <Badge
                        variant="outline"
                        className={getStatusColor(task.status)}
                      >
                        {task.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-xs">2 hours ago</p>
                  </div>
                </div>

                {task.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={comment.user.avatar || "/placeholder.svg"}
                        alt={comment.user.name}
                      />
                      <AvatarFallback>
                        {comment.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {comment.user.name}
                        </span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                      <p className="text-muted-foreground text-xs">
                        {formatDate(comment.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t p-4">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="You"
                  />
                  <AvatarFallback>YO</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    className="min-h-[80px] resize-none"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      disabled={!comment.trim()}
                      onClick={handleAddComment}
                    >
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

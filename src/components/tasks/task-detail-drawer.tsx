"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { InviteCollaboratorModal } from "../modals/invite-collaborator-modal";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AlignLeft, Calendar, Calendar1, CheckCircle2, ChevronDown, ChevronRight, Circle, Clock, FileText, Link, MoreHorizontal, Paperclip, Plus, Send, UserPlus } from "lucide-react";
import { formatDate, formatRelativeTime } from "~/libs/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";

type Props = {
  task: any;
  // open: boolean;
  // onClose: () => void;
};

export function TaskDetailModal({task}: Props) {
  const [comment, setComment] = React.useState("");
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [expandedSubtasks, setExpandedSubtasks] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const handleSendComment = () => {
    // Handle sending the comment
    console.log("Comment sent:", comment);
    setComment("");
  };

  const calculateProgress = () => {
    if (!task?.totalSubtasks) return 0;
    return Math.round((task.completedSubtasks / task.totalSubtasks) * 100);
  };

  if (!task) return null;
  return (
    <div className="min-h-[850px] w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={15}>
          <div className="flex h-full flex-col border-r">
            <div className="bg-muted/10 flex items-center justify-between border-b p-4">
              <h3 className="text-lg font-semibold">Subtasks</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setExpandedSubtasks(!expandedSubtasks)}
              >
                {expandedSubtasks ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </div>

            <ScrollArea className="flex-grow">
              {task.subtasks && expandedSubtasks && (
                <div className="p-2">
                  {task.subtasks.map((subtask) => (
                    <div
                      key={subtask.id}
                      className="group hover:bg-muted/50 flex items-center justify-between rounded-md p-2"
                    >
                      <div className="flex items-center gap-2">
                        {subtask.completed ? (
                          <CheckCircle2 className="text-primary h-4 w-4" />
                        ) : (
                          <Circle className="text-muted-foreground h-4 w-4" />
                        )}
                        <span
                          className={
                            subtask.completed
                              ? "text-muted-foreground line-through"
                              : ""
                          }
                        >
                          {subtask.title}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100"
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant="ghost"
                    className="text-muted-foreground mt-2 w-full justify-start"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add subtask
                  </Button>
                </div>
              )}
            </ScrollArea>

            <div className="border-t p-4">
              <div className="mb-3">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{calculateProgress()}%</span>
                </div>
                <div className="bg-muted h-2 w-full rounded-full">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {task.status}
                </Badge>
                <Badge variant="outline" className="bg-muted/50">
                  {task.priority}
                </Badge>
              </div>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-border" />

        <ResizablePanel defaultSize={50}>
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between border-b p-4">
              <div>
                <h2 className="mb-1 text-2xl font-bold">{task.title}</h2>
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Due{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "Not set"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>
                      {task.trackedHours || 0}/{task.estimatedHours || 0}h
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInviteModalOpen(true)}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite
                </Button>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs
              defaultValue="description"
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex flex-grow flex-col"
            >
              <div className="border-b">
                <TabsList className="h-12 px-4">
                  <TabsTrigger
                    value="description"
                    className="data-[state=active]:border-primary data-[state=active]:border-b-2"
                  >
                    <AlignLeft className="mr-2 h-4 w-4" />
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="attachments"
                    className="data-[state=active]:border-primary data-[state=active]:border-b-2"
                  >
                    <Paperclip className="mr-2 h-4 w-4" />
                    Attachments
                  </TabsTrigger>
                  <TabsTrigger
                    value="links"
                    className="data-[state=active]:border-primary data-[state=active]:border-b-2"
                  >
                    <Link className="mr-2 h-4 w-4" />
                    Links
                  </TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="flex-grow">
                <TabsContent value="description" className="mt-0 h-full p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-3 font-medium">Description</h3>
                      <Textarea
                        className="min-h-32"
                        placeholder="Add a detailed description..."
                        defaultValue={task.description || ""}
                      />
                    </div>

                    <div>
                      <h3 className="mb-3 font-medium">Assignees</h3>
                      <div className="flex flex-wrap gap-2">
                        <div className="bg-muted/50 flex items-center gap-2 rounded-full py-1 pr-3 pl-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={task.assignee?.avatar}
                              alt={task.assignee?.name}
                            />
                            <AvatarFallback>
                              {task.assignee?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium">
                            {task.assignee?.name}
                          </span>
                          <Badge
                            variant="secondary"
                            className="ml-1 px-1.5 text-xs"
                          >
                            Owner
                          </Badge>
                        </div>

                        {task.collaborators?.map((collab) => (
                          <div
                            key={collab.id}
                            className="bg-muted/50 flex items-center gap-2 rounded-full py-1 pr-3 pl-1"
                          >
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={collab.avatar}
                                alt={collab.name}
                              />
                              <AvatarFallback>
                                {collab.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium">
                              {collab.name}
                            </span>
                          </div>
                        ))}

                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                          onClick={() => setInviteModalOpen(true)}
                        >
                          <Plus className="mr-1 h-3 w-3" />
                          Add
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="mb-3 font-medium">Time Tracking</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm">
                              Estimated
                            </span>
                            <Input
                              type="number"
                              className="h-8 w-20"
                              defaultValue={task.estimatedHours || ""}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm">
                              Tracked
                            </span>
                            <span className="font-medium">
                              {task.trackedHours || 0}h
                            </span>
                          </div>
                          <div className="bg-muted mt-1 h-2 w-full rounded-full">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{
                                width: `${task.trackedHours && task.estimatedHours ? (task.trackedHours / task.estimatedHours) * 100 : 0}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-3 font-medium">Dates</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm">
                              Start Date
                            </span>
                            <span className="font-medium">
                              {task.startDate
                                ? new Date(task.startDate).toLocaleDateString()
                                : "Not set"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm">
                              Due Date
                            </span>
                            <span className="font-medium">
                              {task.dueDate
                                ? new Date(task.dueDate).toLocaleDateString()
                                : "Not set"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-3 font-medium">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Design</Badge>
                        <Badge variant="outline">Frontend</Badge>
                        <Button variant="outline" size="sm" className="h-6">
                          <Plus className="mr-1 h-3 w-3" />
                          Add Tag
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="attachments" className="mt-0 p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Attachments</h3>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add File
                      </Button>
                    </div>

                    <div className="rounded-lg border-2 border-dashed p-10 text-center">
                      <div className="flex flex-col items-center">
                        <FileText className="text-muted-foreground mb-4 h-10 w-10" />
                        <h4 className="mb-2 text-lg font-medium">
                          No attachments yet
                        </h4>
                        <p className="text-muted-foreground mb-4">
                          Upload files related to this task
                        </p>
                        <Button>Upload Files</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="links" className="mt-0 p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Related Links</h3>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Link
                      </Button>
                    </div>

                    <div className="rounded-lg border-2 border-dashed p-10 text-center">
                      <div className="flex flex-col items-center">
                        <Link className="text-muted-foreground mb-4 h-10 w-10" />
                        <h4 className="mb-2 text-lg font-medium">
                          No links yet
                        </h4>
                        <p className="text-muted-foreground mb-4">
                          Add links to related resources
                        </p>
                        <Button>Add Link</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-border" />

        <ResizablePanel defaultSize={15}>
          <div className="flex h-full w-full items-center justify-center p-6">
            {/* Left sidebar - Activity & Comments - 25% */}
            <div className="bg-muted/20 flex h-full flex-col border-r">
              <div className="bg-background flex items-center justify-between border-b p-4">
                <h3 className="text-lg font-semibold">Activity</h3>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="bg-muted/50 mb-4 rounded-md px-3 py-2">
                <div className="flex items-center gap-2">
                  <Clock className="text-muted-foreground h-3.5 w-3.5" />
                  <span className="text-muted-foreground text-xs">
                    Updated 12/8/2001
                    {/* Updated {formatDate(task.updatedAt)} */}
                  </span>
                </div>
              </div>

              <div className="bg-muted/50 rounded-md px-3 py-2">
                <div className="flex items-center gap-2">
                  <Calendar1 className="text-muted-foreground h-3.5 w-3.5" />
                  <span className="text-muted-foreground text-xs">
                    Created 12/8/2001
                    {/* Created {formatDate(task.createdAt)} */}
                  </span>
                </div>
              </div>

              <ScrollArea className="mt-5 flex-grow p-4">
                {task.comments &&
                  task.comments.map((comment) => {
                    console.log("Single comment", comment);
                    return (
                      <div key={comment.id} className="mb-6">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={comment.user.avatar}
                              alt={comment.user.name}
                            />
                            <AvatarFallback>
                              {comment.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium">
                                {comment.user.name}
                              </p>
                              <span className="text-muted-foreground text-xs">
                                8:35pm
                                {/* {formatRelativeTime(comment.timestamp)} */}
                              </span>
                            </div>
                            <p className="mt-1 text-sm">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </ScrollArea>

              <div className="bg-background border-t p-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="text-sm"
                  />
                  <Button size="icon" onClick={handleSendComment}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <InviteCollaboratorModal />
    </div>
  );
}

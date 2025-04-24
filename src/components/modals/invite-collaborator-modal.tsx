"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { X, Mail, Plus, Search } from "lucide-react";
import { toast } from "sonner";

type InviteCollaboratorModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "task" | "note" | "workspace" | "project";
  itemName: string;
  itemId: string;
};

export function InviteCollaboratorModal({
  open,
  onOpenChange,
  type,
  itemName,
  itemId,
}: InviteCollaboratorModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");
  const [isLoading, setIsLoading] = useState(false);
  const [invitedUsers, setInvitedUsers] = useState<
    {
      email: string;
      role: string;
      id: string;
      name?: string;
      avatar?: string;
    }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample team members for search
  const teamMembers = [
    {
      id: "user-1",
      name: "John Doe",
      email: "john~example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "user-2",
      name: "Jane Smith",
      email: "jane~example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "user-3",
      name: "Bob Johnson",
      email: "bob~example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "user-4",
      name: "Alice Williams",
      email: "alice~example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: "user-5",
      name: "Charlie Brown",
      email: "charlie~example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ];

  const filteredTeamMembers = teamMembers.filter(
    (member) =>
      (member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      !invitedUsers.some((user) => user.email === member.email),
  );

  const handleAddCollaborator = () => {
    if (!email) {
      toast("Please enter an email address.");
      return;
    }

    // Check if email is already in the list
    if (invitedUsers.some((user) => user.email === email)) {
      toast("This user has already been invited.");
      return;
    }

    setInvitedUsers([
      ...invitedUsers,
      {
        email,
        role,
        id: `invited-${Date.now()}`,
      },
    ]);
    setEmail("");
  };

  const handleAddTeamMember = (member: (typeof teamMembers)[0]) => {
    setInvitedUsers([
      ...invitedUsers,
      {
        email: member.email,
        role,
        id: member.id,
        name: member.name,
        avatar: member.avatar,
      },
    ]);
    setSearchQuery("");
  };

  const handleRemoveInvitedUser = (id: string) => {
    setInvitedUsers(invitedUsers.filter((user) => user.id !== id));
  };

  const handleSendInvitations = () => {
    if (invitedUsers.length === 0) {
      toast("Please add at least one collaborator.");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast(
        `${invitedUsers.length} collaborator(s) have been invited to this ${type}.`,
      c);
      onOpenChange(false);
      setInvitedUsers([]);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Collaborators</DialogTitle>
          <DialogDescription>
            Add team members to collaborate on this {type}: {itemName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="search">Find team members</Label>
            <div className="relative">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                id="search"
                type="text"
                placeholder="Search by name or email"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchQuery && filteredTeamMembers.length > 0 && (
              <div className="bg-popover mt-1 max-h-48 overflow-y-auto rounded-md border p-1 shadow-md">
                {filteredTeamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center justify-between rounded-sm px-2 py-1.5"
                    onClick={() => handleAddTeamMember(member)}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                        />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {member.email}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name~example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role" className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                onClick={handleAddCollaborator}
                className="mb-[1px]"
              >
                Add
              </Button>
            </div>
          </div>

          {invitedUsers.length > 0 && (
            <div className="space-y-2">
              <Label>Invited collaborators</Label>
              <div className="rounded-md border">
                {invitedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between border-b p-2 last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      {user.avatar ? (
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name || user.email}
                          />
                          <AvatarFallback>
                            {(user.name || user.email).charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="bg-primary/10 flex h-6 w-6 items-center justify-center rounded-full">
                          <Mail className="text-primary h-3 w-3" />
                        </div>
                      )}
                      <div>
                        {user.name && (
                          <p className="text-sm font-medium">{user.name}</p>
                        )}
                        <p className="text-muted-foreground text-xs">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                        {user.role}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleRemoveInvitedUser(user.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSendInvitations}
            disabled={isLoading || invitedUsers.length === 0}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg
                  className="mr-3 -ml-1 h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </div>
            ) : (
              `Send ${invitedUsers.length} Invitation${invitedUsers.length !== 1 ? "s" : ""}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

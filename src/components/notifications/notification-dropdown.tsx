"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { formatRelativeTime } from "~/libs/utils";

type Notification = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  user?: {
    name: string;
    avatar: string;
  };
};

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Task Assigned",
      description: "You have been assigned to 'Design new dashboard layout'",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      read: false,
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "2",
      title: "Task Completed",
      description: "Jane Smith completed 'Optimize database queries'",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      read: false,
      user: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "3",
      title: "Comment on Task",
      description: "Bob Johnson commented on 'Implement user authentication'",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      read: true,
      user: {
        name: "Bob Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
      },
    },
    {
      id: "4",
      title: "Due Date Approaching",
      description: "Task 'Create mobile app wireframes' is due tomorrow",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto text-xs"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start p-3 ${notification.read ? "" : "bg-muted/50"}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex w-full gap-2">
                  {notification.user && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={notification.user.avatar || "/placeholder.svg"}
                        alt={notification.user.name}
                      />
                      <AvatarFallback>
                        {notification.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm leading-none font-medium">
                      {notification.title}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {notification.description}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {formatRelativeTime(notification.timestamp)}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="text-muted-foreground p-4 text-center text-sm">
              No notifications
            </div>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

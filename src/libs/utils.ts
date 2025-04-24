import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "To Do":
      return "bg-blue-50 text-blue-600 border-blue-200";
    case "In Progress":
      return "bg-yellow-50 text-yellow-600 border-yellow-200";
    case "In Review":
      return "bg-purple-50 text-purple-600 border-purple-200";
    case "Completed":
      return "bg-green-50 text-green-600 border-green-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "Low":
      return "bg-gray-50 text-gray-600 border-gray-200";
    case "Medium":
      return "bg-blue-50 text-blue-600 border-blue-200";
    case "High":
      return "bg-orange-50 text-orange-600 border-orange-200";
    case "Urgent":
      return "bg-red-50 text-red-600 border-red-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

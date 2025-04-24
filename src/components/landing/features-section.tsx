"use client";

import { motion } from "framer-motion";
import {
  CheckSquare,
  FileText,
  Users,
  Calendar,
  BarChart,
  Clock,
  Zap,
  Shield,
} from "lucide-react";
import { BentoGrid, BentoGridItem } from "~/components/ui/bento-grid";

export function FeaturesSection() {
  const features = [
    {
      title: "Task Management",
      description:
        "Create, organize, and track tasks with ease. Set priorities, deadlines, and dependencies.",
      icon: CheckSquare,
      color: "bg-blue-500",
    },
    {
      title: "Team Collaboration",
      description:
        "Work together seamlessly with real-time updates, comments, and shared workspaces.",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Rich Text Notes",
      description:
        "Create detailed notes with formatting, images, and attachments for comprehensive documentation.",
      icon: FileText,
      color: "bg-green-500",
    },
    {
      title: "Project Timeline",
      description:
        "Visualize project progress with interactive timelines and milestone tracking.",
      icon: Calendar,
      color: "bg-orange-500",
    },
    {
      title: "Analytics Dashboard",
      description:
        "Gain insights into productivity, task completion rates, and team performance.",
      icon: BarChart,
      color: "bg-red-500",
    },
    {
      title: "Time Tracking",
      description:
        "Monitor time spent on tasks and projects to improve productivity and billing.",
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Automation",
      description:
        "Automate repetitive tasks and workflows to save time and reduce errors.",
      icon: Zap,
      color: "bg-indigo-500",
    },
    {
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with data encryption and regular backups.",
      icon: Shield,
      color: "bg-teal-500",
    },
  ];

  return (
    <div className="bg-muted/50 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Powerful Features for Teams of All Sizes
          </h2>
          <p className="text-muted-foreground text-lg">
            TaskFlow combines powerful features with an intuitive interface to
            help you manage work efficiently.
          </p>
        </motion.div>

        <BentoGrid className="mx-auto max-w-6xl">
          {features.map((feature, i) => (
            <BentoGridItem
              key={i}
              title={feature.title}
              description={feature.description}
              header={
                <div
                  className={`${feature.color} flex h-full w-full items-center justify-center rounded-lg p-6`}
                >
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
              }
              className="border-border/50 border"
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}

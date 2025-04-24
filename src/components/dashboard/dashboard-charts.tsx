"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Chart, ChartContainer, ChartTooltip } from "~/components/ui/chart";
import { BarChart, LineChart, PieChart } from "recharts";
import {
  Bar,
  Line,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function DashboardCharts() {
  // Task completion data by day
  const taskCompletionData = [
    { name: "Mon", completed: 4, pending: 2 },
    { name: "Tue", completed: 3, pending: 1 },
    { name: "Wed", completed: 5, pending: 3 },
    { name: "Thu", completed: 2, pending: 4 },
    { name: "Fri", completed: 6, pending: 2 },
    { name: "Sat", completed: 3, pending: 1 },
    { name: "Sun", completed: 1, pending: 0 },
  ];

  // Task status distribution
  const taskStatusData = [
    { name: "To Do", value: 8, color: "#3b82f6" },
    { name: "In Progress", value: 6, color: "#f59e0b" },
    { name: "In Review", value: 4, color: "#8b5cf6" },
    { name: "Completed", value: 12, color: "#10b981" },
  ];

  // Project progress data
  const projectProgressData = [
    { name: "Website Redesign", progress: 75 },
    { name: "Mobile App", progress: 45 },
    { name: "Marketing Campaign", progress: 90 },
    { name: "Product Launch", progress: 30 },
    { name: "Customer Research", progress: 60 },
  ];

  // Time spent by category
  const timeSpentData = [
    { name: "Jan", development: 30, design: 20, meetings: 10 },
    { name: "Feb", development: 25, design: 15, meetings: 15 },
    { name: "Mar", development: 35, design: 25, meetings: 5 },
    { name: "Apr", development: 40, design: 10, meetings: 10 },
    { name: "May", development: 20, design: 30, meetings: 15 },
    { name: "Jun", development: 35, design: 15, meetings: 10 },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Task Completion</CardTitle>
          <CardDescription>
            Daily task completion over the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Chart className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="completed"
                    name="Completed"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="pending"
                    name="Pending"
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Chart>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Task Status</CardTitle>
          <CardDescription>Distribution of tasks by status</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Chart>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Progress</CardTitle>
          <CardDescription>Current progress of active projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Chart className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={projectProgressData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="progress" fill="#8b5cf6" radius={[0, 4, 4, 0]}>
                    {projectProgressData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.progress < 40
                            ? "#ef4444"
                            : entry.progress < 70
                              ? "#f59e0b"
                              : "#10b981"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Chart>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time Spent</CardTitle>
          <CardDescription>
            Time spent by category over the past 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Chart className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSpentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="development"
                    name="Development"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="design"
                    name="Design"
                    stroke="#ec4899"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="meetings"
                    name="Meetings"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Chart>
        </CardContent>
      </Card>
    </div>
  );
}

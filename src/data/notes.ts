export const notes = [
  {
    id: "note-1",
    title: "Meeting Notes: Product Team",
    content:
      "Discussed upcoming features for Q2. Key points: 1) Implement user dashboard, 2) Improve onboarding flow, 3) Add export functionality.",
    workspaceId: "workspace-2",
    createdAt: "2023-04-10T09:30:00Z",
    updatedAt: "2023-04-10T11:15:00Z",
  },
  {
    id: "note-2",
    title: "Project Ideas",
    content:
      "1. Mobile app for task management\n2. Browser extension for productivity\n3. AI-powered content generator",
    workspaceId: "workspace-3",
    createdAt: "2023-04-05T14:20:00Z",
    updatedAt: "2023-04-12T16:45:00Z",
  },
  {
    id: "note-3",
    title: "Learning Plan: React Advanced Concepts",
    content:
      "Topics to cover:\n- Context API\n- Custom Hooks\n- Performance Optimization\n- Server Components\n- Suspense and Concurrent Mode",
    workspaceId: "workspace-4",
    createdAt: "2023-04-08T10:00:00Z",
    updatedAt: "2023-04-15T09:30:00Z",
  },
  {
    id: "note-4",
    title: "Daily Journal: April 18",
    content:
      "Today was productive. Completed the database optimization task and started working on the API documentation. Had a good meeting with the design team about the new UI components.",
    workspaceId: "workspace-5",
    createdAt: "2023-04-18T20:15:00Z",
    updatedAt: "2023-04-18T20:30:00Z",
  },
  {
    id: "note-5",
    title: "Vacation Planning",
    content:
      "Potential destinations:\n1. Japan (Tokyo, Kyoto)\n2. Italy (Rome, Florence, Venice)\n3. Norway (Oslo, Bergen, fjords)\n\nBest time to visit: September-October",
    workspaceId: "workspace-1",
    createdAt: "2023-04-02T18:30:00Z",
    updatedAt: "2023-04-14T19:45:00Z",
  },
  {
    id: "note-6",
    title: "Book Recommendations",
    content:
      "Fiction:\n- Project Hail Mary by Andy Weir\n- The Midnight Library by Matt Haig\n\nNon-fiction:\n- Atomic Habits by James Clear\n- Deep Work by Cal Newport",
    workspaceId: "workspace-1",
    createdAt: "2023-04-07T21:00:00Z",
    updatedAt: "2023-04-16T22:15:00Z",
  },
  {
    id: "note-7",
    title: "Marketing Campaign Ideas",
    content:
      "1. Social media contest with user-generated content\n2. Email sequence highlighting customer success stories\n3. Webinar series on industry trends\n4. Limited-time discount for annual subscriptions",
    workspaceId: "workspace-2",
    createdAt: "2023-04-11T13:45:00Z",
    updatedAt: "2023-04-17T10:30:00Z",
  },
  {
    id: "note-8",
    title: "App Feature Brainstorming",
    content:
      "Potential features:\n- Dark mode\n- Offline support\n- Data visualization\n- Export to multiple formats\n- Collaboration tools\n- AI-powered suggestions",
    workspaceId: "workspace-6",
    createdAt: "2023-04-13T15:20:00Z",
    updatedAt: "2023-04-13T16:45:00Z",
  },
  {
    id: "note-9",
    title: "Weekly Goals: April 17-23",
    content:
      "1. Complete API documentation\n2. Review pull requests\n3. Prepare presentation for client meeting\n4. Start learning TypeScript\n5. Organize team building activity",
    workspaceId: "workspace-2",
    createdAt: "2023-04-17T08:00:00Z",
    updatedAt: "2023-04-17T08:30:00Z",
  },
  {
    id: "note-10",
    title: "Fitness Plan",
    content:
      "Monday: Upper body strength\nTuesday: Running (5k)\nWednesday: Rest\nThursday: Lower body strength\nFriday: HIIT\nSaturday: Yoga\nSunday: Rest",
    workspaceId: "workspace-1",
    createdAt: "2023-04-03T19:15:00Z",
    updatedAt: "2023-04-10T20:00:00Z",
  },
];

// Generate more notes to have a good amount for each workspace
const workspaceIds = [
  "workspace-1",
  "workspace-2",
  "workspace-3",
  "workspace-4",
  "workspace-5",
  "workspace-6",
];

for (let i = 11; i <= 60; i++) {
  const randomWorkspaceId =
    workspaceIds[Math.floor(Math.random() * workspaceIds.length)];

  const now = new Date();
  const pastDate = new Date(now);
  pastDate.setDate(now.getDate() - Math.floor(Math.random() * 30));

  const updateDate = new Date(pastDate);
  updateDate.setDate(
    pastDate.getDate() +
      Math.floor(Math.random() * (now.getDate() - pastDate.getDate() + 1)),
  );

  notes.push({
    id: `note-${i}`,
    title: `Note ${i}`,
    content: `This is the content for Note ${i}. It contains various information related to the workspace it belongs to.`,
    workspaceId: randomWorkspaceId,
    createdAt: pastDate.toISOString(),
    updatedAt: updateDate.toISOString(),
  });
}

import Link from "next/link";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { workspaces } from "~/app/data/workspaces";
import { notes } from "~/app/data/notes";
import { formatRelativeTime } from "~/libs/utils";

export function NotesGrid() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-lg font-semibold">Workspaces</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {workspaces.map((workspace) => (
            <Link key={workspace.id} href={`/dashboard/notes/${workspace.id}`}>
              <Card className="h-full cursor-pointer transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${workspace.color}20` }}
                    >
                      <workspace.icon
                        className="h-6 w-6"
                        style={{ color: workspace.color }}
                      />
                    </div>
                    <h3 className="font-semibold">{workspace.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {workspace.description}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 text-center">
                  <span className="text-muted-foreground mx-auto text-xs">
                    {workspace.noteCount} notes
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Recent Notes</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {notes
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime(),
            )
            .slice(0, 8)
            .map((note) => {
              const workspace = workspaces.find(
                (w) => w.id === note.workspaceId,
              );

              return (
                <Card
                  key={note.id}
                  className="h-full cursor-pointer transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="line-clamp-1 font-semibold">
                          {note.title}
                        </h3>
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
                      </div>
                      <p className="text-muted-foreground line-clamp-3 text-sm">
                        {note.content}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <span className="text-muted-foreground text-xs">
                      Updated {formatRelativeTime(note.updatedAt)}
                    </span>
                  </CardFooter>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
}

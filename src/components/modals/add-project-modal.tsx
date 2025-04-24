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
import { Textarea } from "~/components/ui/textarea";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { toast } from "sonner";

type AddProjectModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddProjectModal({ open, onOpenChange }: AddProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#4f46e5");

  const handleSubmit = () => {
    if (!name.trim()) {
      toast("Project name is required");
      return;
    }

    // Here you would normally send the data to your API
    toast("Project created successfully");

    // Reset form and close modal
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setColor("#4f46e5");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Add a new project to organize your tasks.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="color" className="text-sm font-medium">
              Color
            </label>
            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-md border"
                style={{ backgroundColor: color }}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Choose Color</Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <HexColorPicker color={color} onChange={setColor} />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

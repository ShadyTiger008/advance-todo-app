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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Briefcase,
  Coffee,
  FileText,
  Home,
  Laptop,
  Rocket,
} from "lucide-react";
import { toast } from "sonner";

type AddWorkspaceModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddWorkspaceModal({
  open,
  onOpenChange,
}: AddWorkspaceModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#4f46e5");
  const [icon, setIcon] = useState("Home");

  const icons = [
    { name: "Home", component: Home },
    { name: "Briefcase", component: Briefcase },
    { name: "Rocket", component: Rocket },
    { name: "Laptop", component: Laptop },
    { name: "FileText", component: FileText },
    { name: "Coffee", component: Coffee },
  ];

  const handleSubmit = () => {
    if (!name.trim()) {
      toast("Workspace name is required");
      return;
    }

    // Here you would normally send the data to your API
    toast("Workspace created successfully");

    // Reset form and close modal
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setColor("#4f46e5");
    setIcon("Home");
  };

  const IconComponent = icons.find((i) => i.name === icon)?.component || Home;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
          <DialogDescription>
            Add a new workspace to organize your notes.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="name"
              placeholder="Workspace name"
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
              placeholder="Workspace description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="icon" className="text-sm font-medium">
              Icon
            </label>
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-md border"
                style={{ backgroundColor: `${color}20` }}
              >
                <IconComponent className="h-6 w-6" style={{ color }} />
              </div>
              <Select value={icon} onValueChange={setIcon}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  {icons.map((icon) => (
                    <SelectItem key={icon.name} value={icon.name}>
                      <div className="flex items-center">
                        <icon.component className="mr-2 h-4 w-4" />
                        {icon.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
          <Button onClick={handleSubmit}>Create Workspace</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

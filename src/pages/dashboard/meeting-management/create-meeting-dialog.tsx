import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"; // Import toast từ sonner

interface Room {
  title: string;
  description?: string;
  meetLink: string;
  startTime: string;
  endTime: string;
}

interface CreateMeetingDialogProps {
  onCreate: (meeting: Partial<Room>) => void;
}

const CreateMeetingDialog: React.FC<CreateMeetingDialogProps> = ({ onCreate }) => {
  const [newMeeting, setNewMeeting] = useState<Partial<Room>>({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    meetLink: "",
  });

  const handleCreate = () => {
    // Validate fields
    if (!newMeeting.title || !newMeeting.startTime || !newMeeting.endTime || !newMeeting.meetLink) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (new Date(newMeeting.startTime) >= new Date(newMeeting.endTime)) {
      toast.error("Start Time must be earlier than End Time.");
      return;
    }

    onCreate(newMeeting);
    toast.success("Meeting created successfully!");

    // Reset form after creating a meeting
    setNewMeeting({
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      meetLink: "",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
          Add Meeting
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Meeting</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Title */}
          <Input
            placeholder="Meeting Title"
            value={newMeeting.title}
            onChange={(e) => setNewMeeting((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
          {/* Description */}
          <Textarea
            placeholder="Meeting Description (optional)"
            value={newMeeting.description || ""}
            onChange={(e) => setNewMeeting((prev) => ({ ...prev, description: e.target.value }))}
          />
          {/* Start Time */}
          <Input
            type="datetime-local"
            value={newMeeting.startTime || ""}
            onChange={(e) => setNewMeeting((prev) => ({ ...prev, startTime: e.target.value }))}
            required
          />
          {/* End Time */}
          <Input
            type="datetime-local"
            value={newMeeting.endTime || ""}
            onChange={(e) => setNewMeeting((prev) => ({ ...prev, endTime: e.target.value }))}
            required
          />
          {/* Meeting Link */}
          <Input
            placeholder="Meeting Link (e.g., https://meet.google.com/xyz-abc)"
            value={newMeeting.meetLink}
            onChange={(e) => setNewMeeting((prev) => ({ ...prev, meetLink: e.target.value }))}
            required
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleCreate} className="bg-blue-500 text-white">
            Create Meeting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMeetingDialog;

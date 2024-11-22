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
  _id: string;
  title: string;
  description: string;
  meetLink: string;
  startTime: string;
  endTime: string;
}

interface UpdateMeetingDialogProps {
  room: Room;
  onUpdate: (updatedRoom: Partial<Room>) => void;
}

const formatToDatetimeLocal = (isoString: string) => {
  const date = new Date(isoString);
  const offset = date.getTimezoneOffset() * 60000; // Adjust for timezone
  const localISOTime = new Date(date.getTime() - offset).toISOString().slice(0, 16);
  return localISOTime;
};

const UpdateMeetingDialog: React.FC<UpdateMeetingDialogProps> = ({ room, onUpdate }) => {
  const [updatedRoom, setUpdatedRoom] = useState<Partial<Room>>({
    ...room,
    startTime: formatToDatetimeLocal(room.startTime),
    endTime: formatToDatetimeLocal(room.endTime),
  });

  const handleUpdate = () => {
    if (new Date(updatedRoom.startTime!) >= new Date(updatedRoom.endTime!)) {
      toast.error("Start Time must be earlier than End Time.");
      return;
    }

    onUpdate(updatedRoom);
    toast.success("Meeting updated successfully!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-600 hover:text-blue-800">Edit</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Meeting</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Title */}
          <Input
            id="title"
            placeholder="Meeting Title"
            value={updatedRoom.title || ""}
            onChange={(e) => setUpdatedRoom({ ...updatedRoom, title: e.target.value })}
          />
          {/* Description */}
          <Textarea
            id="description"
            placeholder="Meeting Description"
            value={updatedRoom.description || ""}
            onChange={(e) => setUpdatedRoom({ ...updatedRoom, description: e.target.value })}
          />
          {/* Start Time */}
          <Input
            id="startTime"
            type="datetime-local"
            value={updatedRoom.startTime || ""}
            onChange={(e) => setUpdatedRoom({ ...updatedRoom, startTime: e.target.value })}
            required
          />
          {/* End Time */}
          <Input
            id="endTime"
            type="datetime-local"
            value={updatedRoom.endTime || ""}
            onChange={(e) => setUpdatedRoom({ ...updatedRoom, endTime: e.target.value })}
            required
          />
          {/* Meet Link */}
          <Input
            id="meetLink"
            placeholder="Meeting Link"
            value={updatedRoom.meetLink || ""}
            onChange={(e) => setUpdatedRoom({ ...updatedRoom, meetLink: e.target.value })}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleUpdate} className="bg-blue-500 text-white">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMeetingDialog;

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

interface Meeting {
  title: string;
  description: string;
  date: string;
  startTime: string; // Time format with AM/PM
  endTime: string;   // Time format with AM/PM
  status: "Scheduled" | "In Progress" | "Completed";
  resources: string;
}

interface UpdateMeetingDialogProps {
  meeting: Meeting;
  onUpdate: (updatedMeeting: Meeting) => void;
}

const UpdateMeetingDialog: React.FC<UpdateMeetingDialogProps> = ({ meeting, onUpdate }) => {
  const [updatedMeeting, setUpdatedMeeting] = useState<Meeting>({ ...meeting });
  const [startMeridian, setStartMeridian] = useState<"AM" | "PM">(updatedMeeting.startTime.includes("AM") ? "AM" : "PM");
  const [endMeridian, setEndMeridian] = useState<"AM" | "PM">(updatedMeeting.endTime.includes("AM") ? "AM" : "PM");

  const handleUpdate = () => {
    if (!updatedMeeting.startTime || !updatedMeeting.endTime) {
      toast.error("Vui lòng nhập giờ bắt đầu và giờ kết thúc.");
      return;
    }

    const startHour = parseInt(updatedMeeting.startTime.split(":")[0], 10);
    const endHour = parseInt(updatedMeeting.endTime.split(":")[0], 10);

    if (
      (startMeridian === "PM" && startHour !== 12 ? startHour + 12 : startHour) >=
      (endMeridian === "PM" && endHour !== 12 ? endHour + 12 : endHour)
    ) {
      toast.error("Giờ bắt đầu phải nhỏ hơn giờ kết thúc.");
      return;
    }

    const formattedMeeting = {
      ...updatedMeeting,
      startTime: `${updatedMeeting.startTime} ${startMeridian}`,
      endTime: `${updatedMeeting.endTime} ${endMeridian}`,
    };

    onUpdate(formattedMeeting);
    toast.success("Cập nhật thông tin thành công!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-600 hover:text-blue-800">Edit</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin cuộc họp</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Title */}
          <Input
            id="title"
            placeholder="Tên cuộc họp"
            value={updatedMeeting.title}
            onChange={(e) => setUpdatedMeeting({ ...updatedMeeting, title: e.target.value })}
          />
          {/* Description */}
          <Textarea
            id="description"
            placeholder="Mô tả"
            value={updatedMeeting.description}
            onChange={(e) => setUpdatedMeeting({ ...updatedMeeting, description: e.target.value })}
          />
          {/* Date */}
          <Input
            id="date"
            type="date"
            value={updatedMeeting.date}
            onChange={(e) => setUpdatedMeeting({ ...updatedMeeting, date: e.target.value })}
          />
          {/* Start Time */}
          <div className="flex items-center gap-2">
            <Input
              id="startTime"
              type="time"
              value={updatedMeeting.startTime.replace(" AM", "").replace(" PM", "")}
              onChange={(e) => setUpdatedMeeting({ ...updatedMeeting, startTime: e.target.value })}
              className="flex-1"
            />
            <select
              value={startMeridian}
              onChange={(e) => setStartMeridian(e.target.value as "AM" | "PM")}
              className="border rounded-md p-2"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          {/* End Time */}
          <div className="flex items-center gap-2">
            <Input
              id="endTime"
              type="time"
              value={updatedMeeting.endTime.replace(" AM", "").replace(" PM", "")}
              onChange={(e) => setUpdatedMeeting({ ...updatedMeeting, endTime: e.target.value })}
              className="flex-1"
            />
            <select
              value={endMeridian}
              onChange={(e) => setEndMeridian(e.target.value as "AM" | "PM")}
              className="border rounded-md p-2"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          {/* Resources */}
          <Input
            id="resources"
            placeholder="Link tài nguyên"
            value={updatedMeeting.resources}
            onChange={(e) => setUpdatedMeeting({ ...updatedMeeting, resources: e.target.value })}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button onClick={handleUpdate} className="bg-blue-500 text-white">
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateMeetingDialog;

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
  startTime: string;
  endTime: string;
  status: "Scheduled" | "In Progress" | "Completed";
  resources: string;
}

interface CreateMeetingDialogProps {
  onCreate: (meeting: Meeting) => void;
}

const CreateMeetingDialog: React.FC<CreateMeetingDialogProps> = ({ onCreate }) => {
  const [newMeeting, setNewMeeting] = useState<Partial<Meeting>>({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    status: "Scheduled",
    resources: "",
  });
  const [startMeridian, setStartMeridian] = useState<"AM" | "PM">("AM");
  const [endMeridian, setEndMeridian] = useState<"AM" | "PM">("AM");

  // Hàm chuyển đổi thời gian sang định dạng 24 giờ
  const convertTo24HourFormat = (time: string, meridian: "AM" | "PM"): number => {
    const [hours, minutes] = time.split(":").map(Number);
    const adjustedHours = meridian === "PM" && hours !== 12 ? hours + 12 : hours === 12 && meridian === "AM" ? 0 : hours;
    return adjustedHours * 60 + minutes; // Tổng số phút
  };

  const handleCreate = () => {
    if (
      !newMeeting.title ||
      !newMeeting.date ||
      !newMeeting.startTime ||
      !newMeeting.endTime ||
      !newMeeting.resources
    ) {
      toast.error("Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    }

    const startMinutes = convertTo24HourFormat(newMeeting.startTime!, startMeridian);
    const endMinutes = convertTo24HourFormat(newMeeting.endTime!, endMeridian);

    if (startMinutes >= endMinutes) {
      toast.error("Giờ kết thúc phải sau giờ bắt đầu.");
      return;
    }

    const formattedMeeting = {
      ...newMeeting,
      startTime: `${newMeeting.startTime} ${startMeridian}`,
      endTime: `${newMeeting.endTime} ${endMeridian}`,
      status: newMeeting.status || "Scheduled",
    } as Meeting;

    onCreate(formattedMeeting);

    toast.success("Tạo cuộc họp thành công!");

    // Reset form sau khi tạo
    setNewMeeting({
      title: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      status: "Scheduled",
      resources: "",
    });
    setStartMeridian("AM");
    setEndMeridian("AM");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
          Thêm cuộc họp
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm cuộc họp mới</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Title */}
          <Input
            placeholder="Tên cuộc họp"
            value={newMeeting.title}
            onChange={(e) => setNewMeeting((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
          {/* Description */}
          <Textarea
            placeholder="Mô tả (không bắt buộc)"
            value={newMeeting.description}
            onChange={(e) => setNewMeeting((prev) => ({ ...prev, description: e.target.value }))}
          />
          {/* Date */}
          <Input
            type="date"
            value={newMeeting.date}
            onChange={(e) => setNewMeeting((prev) => ({ ...prev, date: e.target.value }))}
            required
          />
          {/* Start Time */}
          <div className="flex items-center gap-2">
            <Input
              type="time"
              value={newMeeting.startTime}
              onChange={(e) => setNewMeeting((prev) => ({ ...prev, startTime: e.target.value }))}
              required
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
              type="time"
              value={newMeeting.endTime}
              onChange={(e) => setNewMeeting((prev) => ({ ...prev, endTime: e.target.value }))}
              required
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
          {/* Resources Link */}
          <Input
            placeholder="Link tài nguyên"
            value={newMeeting.resources}
            onChange={(e) => setNewMeeting((prev) => ({ ...prev, resources: e.target.value }))}
            required
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button
            onClick={handleCreate}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMeetingDialog;

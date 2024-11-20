import React, { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import CreateMeetingDialog from "../create-meeting-dialog";
import UpdateMeetingDialog from "../update-meeting-dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FaFilter } from "react-icons/fa";

interface Meeting {
  title: string;
  description: string;
  date: string;
  startTime: string; // Time format with AM/PM
  endTime: string;   // Time format with AM/PM
  status: "Scheduled" | "In Progress" | "Completed";
  resources: string;
}

const MeetingManagementDashboard: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      title: "Advanced Mathematics",
      description: "Join us for an interactive study session covering calculus, linear algebra, and statistics.",
      startTime: "09:00 AM",
      endTime: "10:00 AM",
      date: "2024-07-11",
      resources: "https://meet.google.com/xyz-abcd-123",
      status: "Scheduled",
    },
    {
      title: "Physics Problem Solving",
      description: "Study session focused on thermodynamics and mechanics.",
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      date: "2024-07-12",
      resources: "https://meet.google.com/abc-def-456",
      status: "In Progress",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterDate, setFilterDate] = useState<string>("");

  const handleAddMeeting = (meeting: Meeting) => {
    setMeetings((prev) => [...prev, meeting]);
  };

  const handleUpdateMeeting = (updatedMeeting: Meeting) => {
    setMeetings((prev) =>
      prev.map((meeting) => (meeting.title === updatedMeeting.title ? updatedMeeting : meeting))
    );
  };

  const handleDeleteMeeting = (meetingToDelete: Meeting) => {
    setMeetings((prev) => prev.filter((meeting) => meeting !== meetingToDelete));
  };

  // Lọc dữ liệu
  const filteredMeetings = meetings.filter((meeting) => {
    const matchStatus = filterStatus === "All" || meeting.status === filterStatus;
    const matchDate = !filterDate || meeting.date === filterDate;
    return matchStatus && matchDate;
  });

  const columnsWithActions = columns.map((col) =>
    col.id === "actions"
      ? {
          ...col,
          cell: ({ row }: { row: { original: Meeting } }) => {
            const meeting = row.original;
            return (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => window.open(meeting.resources, "_blank")}
                  className="text-green-600 hover:text-green-800"
                >
                  View
                </button>
                <UpdateMeetingDialog
                  meeting={meeting}
                  onUpdate={(updatedMeeting) => handleUpdateMeeting(updatedMeeting)}
                />
                <button
                  onClick={() => handleDeleteMeeting(meeting)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            );
          },
        }
      : col
  );
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Meeting Management</h1>
        </div>

        {/* Filters and Add Button */}
        <div className="flex gap-4 items-center mb-6">
          <div className="flex-1 flex gap-4 items-center">
            {/* Filter by Status */}
            <Select
              onValueChange={(value) => setFilterStatus(value)}
              defaultValue="All"
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            {/* Filter by Date */}
            <Input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full md:w-[180px]"
            />

            {/* Clear Filters */}
            <Button
              onClick={() => {
                setFilterStatus("All");
                setFilterDate("");
              }}
              variant="outline"
              className="flex items-center gap-2 w-full md:w-auto"
            >
              <FaFilter />
              Clear Filters
            </Button>
          </div>

          {/* Add Meeting */}
          <CreateMeetingDialog onCreate={handleAddMeeting} />
        </div>

        {/* Data Table */}
        <DataTable data={filteredMeetings} columns={columnsWithActions} />
      </div>
    </div>
  );
};

export default MeetingManagementDashboard;

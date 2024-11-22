import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import CreateMeetingDialog from "../create-meeting-dialog";
import UpdateMeetingDialog from "../update-meeting-dialog";
import { fetchRooms, addRoom, deleteRoom, updateRoom } from "@/lib/api/redux/roomSlice";
import { RootState, AppDispatch } from "@/lib/api/store";
import { Room } from "@/lib/api/types/types";

const MeetingManagementDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, loading, error } = useSelector((state: RootState) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleAddRoom = async (room: Partial<Room>) => {
    await dispatch(addRoom(room));
  };

  const handleUpdateRoom = async (id: string, updatedRoom: Partial<Room>) => {
    await dispatch(updateRoom({ id, updatedRoom }));
  };

  const handleDeleteRoom = async (id: string) => {
    await dispatch(deleteRoom(id));
  };

  const columnsWithActions = columns.map((col) =>
    col.id === "actions"
      ? {
          ...col,
          cell: ({ row }: { row: { original: Room } }) => {
            const room = row.original;
            return (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    const absoluteLink = room.meetLink.startsWith("http")
                      ? room.meetLink
                      : `https://${room.meetLink}`;
                    window.open(absoluteLink, "_blank");
                  }}
                  className="text-green-600 hover:text-green-800"
                >
                  View
                </button>
                <UpdateMeetingDialog
                  room={room}
                  onUpdate={(updatedRoom) => handleUpdateRoom(room._id, updatedRoom)}
                />
                <button
                  onClick={() => handleDeleteRoom(room._id)}
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Meeting Management</h1>
        </div>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="flex justify-between items-center mb-6">
          <CreateMeetingDialog onCreate={handleAddRoom} />
        </div>

        <DataTable data={rooms} columns={columnsWithActions} />
      </div>
    </div>
  );
};

export default MeetingManagementDashboard;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "@/lib/api/redux/roomSlice";
import { RootState, AppDispatch } from "@/lib/api/store";
import { StudyRoomCard } from "./StudyRoomCard";
import { Room } from "@/lib/api/types/types";

const StudyRoomPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, loading, error } = useSelector((state: RootState) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleJoinStudyRoom = (link: string): void => {
    const absoluteLink = link.startsWith("http") ? link : `https://${link}`;
    window.open(absoluteLink, "_blank");
  };

  return (
    <div className="p-12">
      {loading && <div className="text-center text-gray-600">Đang tải dữ liệu...</div>}
      {error && <div className="text-center text-red-600">Lỗi: {error}</div>}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms
          .slice()
          .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()) // Sắp xếp theo thời gian giảm dần
          .map((room: Room) => (
            <StudyRoomCard
              key={room._id}
              post={{
                title: room.title,
                description: room.description,
                startTime: new Date(room.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                endTime: new Date(room.endTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                date: new Date(room.startTime).toLocaleDateString(),
                meetLink: room.meetLink,
              }}
              onJoin={() => handleJoinStudyRoom(room.meetLink)}
            />
          ))}
      </div>
    </div>
  );
};

export default StudyRoomPage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "@/lib/api/redux/roomSlice";
import { RootState, AppDispatch } from "@/lib/api/store";
import { StudyRoomCard } from "./StudyRoomCard";
import { Room } from "@/lib/api/types/types";
import { PaginationMeetingPage } from "./pagination"; // Import pagination component

const StudyRoomPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, loading, error } = useSelector((state: RootState) => state.rooms);

  // State to handle current page and rooms per page
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 6; // Set the number of rooms per page

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  // Pagination logic
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms
    .slice() // To avoid mutation of the original rooms array
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()) // Sort by start time
    .slice(indexOfFirstRoom, indexOfLastRoom); // Get rooms for the current page

  const handleJoinStudyRoom = (link: string): void => {
    const absoluteLink = link.startsWith("http") ? link : `https://${link}`;
    window.open(absoluteLink, "_blank");
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="pt-12">
      {loading && <div className="text-center text-gray-600">Đang tải dữ liệu...</div>}
      {error && <div className="text-center text-red-600">Lỗi: {error}</div>}
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentRooms.map((room: Room) => (
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
      
      {/* Pagination */}
     <div className="py-[2%]">
     <PaginationMeetingPage
        totalPages={Math.ceil(rooms.length / roomsPerPage)} // Calculate the total number of pages
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
     </div>
    </div>
  );
};

export default StudyRoomPage;

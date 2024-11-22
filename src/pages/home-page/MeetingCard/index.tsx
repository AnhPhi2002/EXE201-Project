import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "@/lib/api/redux/roomSlice";
import { RootState, AppDispatch } from "@/lib/api/store";
import { motion } from "framer-motion";

const MeetingCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, loading, error } = useSelector((state: RootState) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 md:px-8"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Phòng học trực tuyến</h2>
        {loading && <div className="text-center text-gray-600">Đang tải dữ liệu...</div>}
        {error && <div className="text-center text-red-600">Lỗi: {error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
          {rooms
            .slice()
            .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()) // Sắp xếp theo startTime mới nhất
            .slice(0, 4) // Giới hạn 4 phòng
            .map((room) => (
              <div
                key={room._id}
                className="bg-white/20 rounded-lg p-6 shadow-lg border border-white/20 backdrop-blur-md transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  {/* Title giới hạn */}
                  <h3
                    className="text-xl font-semibold text-white truncate"
                    title={room.title} // Tooltip hiển thị đầy đủ khi hover
                  >
                    {room.title}
                  </h3>
                </div>

                {/* Description giới hạn */}
                <p
                  className="text-gray-700 mb-4 line-clamp-3"
                  title={room.description} // Tooltip hiển thị đầy đủ khi hover
                >
                  {room.description}
                </p>

                <div className="text-sm text-gray-500 mb-4">
                  <div>Bắt đầu: {new Date(room.startTime).toLocaleString()}</div>
                  <div>Kết thúc: {new Date(room.endTime).toLocaleString()}</div>
                </div>

                <a
                  href={room.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 text-center rounded-md transition duration-300 bg-blue-600 text-white hover:bg-blue-700"
                >
                  Tham gia phòng
                </a>
              </div>

            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MeetingCard;

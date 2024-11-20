import React from "react";
import { FaVideo, FaClock } from "react-icons/fa";
import { SupportModal } from "./SupportModal";

interface Post {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string;
  resources: string;
}

interface StudyRoomCardProps {
  post: Post;
  onJoin: () => void;
}

export const StudyRoomCard: React.FC<StudyRoomCardProps> = ({ post, onJoin }) => {
  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/20">
      <h1 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h1>

      <div className="min-h-[100px] mb-6">
        <p className="text-gray-600 leading-relaxed text-sm line-clamp-4">
          {post.description}
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50/50 rounded-lg p-4 backdrop-blur-sm border border-blue-100/30">
          <div className="flex items-center gap-2 text-gray-700 mb-2">
            <FaClock className="text-blue-500 text-sm" />
            <span className="font-medium text-sm">
              {`${post.startTime} - ${post.endTime}, ${post.date}`}
            </span>
          </div>

          <button
            onClick={onJoin}
            className="w-full mt-3 bg-green-500 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-all shadow hover:shadow-lg text-sm"
          >
            <FaVideo />
            <span>Tham gia phòng học</span>
          </button>
        </div>

        <div className="flex justify-end">
          <SupportModal onClose={() => {}} />
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate để điều hướng
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Import Avatar từ shadcn/ui

const ProfilePage: React.FC = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate để điều hướng

  const handleUpdateClick = () => {
    navigate('/profile-detail'); // Điều hướng sang trang ProfileDetail
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-18">
      <div className="w-full max-w-7xl">
        <div className="relative h-36 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <Avatar className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 border-4 border-white shadow-lg">
            <AvatarImage
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
              alt="User profile picture"
            />
            <AvatarFallback>JD</AvatarFallback> {/* Fallback khi không có hình ảnh */}
          </Avatar>
          <button
            className="absolute top-8 right-4 bg-white text-indigo-500 p-2 rounded-full hover:bg-indigo-100 transition duration-300"
            onClick={handleUpdateClick} // Thêm sự kiện onClick để điều hướng
          >
            Cập nhật thông tin
          </button>
        </div>
        <div className="p-8 pt-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Jane Doe</h1>
            <p className="text-gray-600 mb-4">
              Passionate photographer and nature enthusiast
            </p>
          </div>

          <div className="flex justify-center space-x-8 mb-6">
            <div className="text-center">
              <p className="text-lg font-semibold text-indigo-600">1.2k</p>
              <p className="text-xs text-gray-600">Likes</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-indigo-600">234</p>
              <p className="text-xs text-gray-600">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-indigo-600">5.6k</p>
              <p className="text-xs text-gray-600">Comments</p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl shadow-inner mb-6">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700">About Me</h2>
            <p className="text-gray-700 leading-relaxed">
              I'm a passionate photographer who loves to capture the beauty of
              nature. When I'm not behind the lens, you can find me hiking in the
              mountains or experimenting with new recipes in the kitchen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/lib/api/store';
import { fetchUserInfo } from '@/lib/api/redux/userSlice';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleUpdateClick = () => {
    navigate('/profile-detail');
  };

  if (loading) return <p className="text-center text-indigo-600">Loading...</p>;
  if (!profile) return <p className="text-center text-red-600">{error || "No profile data found."}</p>;

  // Xác định màu nền cho từng role
  const roleColors = {
    member_premium: "ext-yellow-700",
    member_free: "text-blue-700",
    staff: "text-green-700",
    admin: " text-red-700",
    default: "text-gray-700"
  };
  const roleClass = profile.role ? roleColors[profile.role] || roleColors.default : roleColors.default;

  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center pb-32">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <Avatar
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-28 h-28 border-4 rounded-full shadow-md 
              ${profile.role === 'member_premium' ? 'border-yellow-500 ring-4 ring-yellow-400' : 'border-white'}`}
          >
            <AvatarImage src={profile.avatar || "https://example.com/default-avatar.jpg"} alt="User profile picture" />
            <AvatarFallback>{profile.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <button
            className="absolute top-6 right-6 bg-white text-indigo-500 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-100 hover:scale-105 transform transition duration-300"
            onClick={handleUpdateClick}
          >
            Cập nhật thông tin
          </button>
        </div>
        <div className="p-10 pt-20 text-center">
          <h1 className={`text-4xl font-extrabold mb-2 ${roleClass}`}>{profile.name || "No Name"}</h1>
          <p className={`text-lg mb-4 ${roleClass}`}>
            {profile.role === 'member_premium' ? "Premium Member" :
              profile.role === 'member_free' ? "Free Member" :
                profile.role === 'staff' ? "Culi không công" :
                  profile.role === 'admin' ? "Sếp" : "Unknown Role"}
          </p>
          <div className="bg-gray-50 p-8 rounded-xl shadow-inner">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">About Me</h2>
            <p className="text-gray-700 leading-relaxed">
              {profile.about || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

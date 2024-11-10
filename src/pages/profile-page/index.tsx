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

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>{error || "No profile data found."}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-18">
      <div className="w-full max-w-7xl">
        <div className="relative h-36 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <Avatar
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 border-4 shadow-lg 
              ${profile.role === 'member_premium' ? 'border-yellow-500 ring-4 ring-yellow-400' : 'border-white'}`}
          >
            <AvatarImage src={profile.avatar || "https://example.com/default-avatar.jpg"} alt="User profile picture" />
            <AvatarFallback>{profile.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <button
            className="absolute top-8 right-4 bg-white text-indigo-500 p-2 rounded-full hover:bg-indigo-100 transition duration-300"
            onClick={handleUpdateClick}
          >
            Cập nhật thông tin
          </button>
        </div>
        <div className="p-8 pt-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">{profile.name || "No Name"}</h1>
            <p className="text-gray-600 mb-4">
              {profile.role === 'member_premium' ? "Premium Member" : "Free Member"}
            </p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl shadow-inner mb-6">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700">About Me</h2>
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

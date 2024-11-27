// SubjectPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FaStar, FaHome, FaChevronRight, FaHeart } from 'react-icons/fa';

import { RootState, AppDispatch } from '@/lib/api/store';
import { fetchResourcesBySubject } from '@/lib/api/redux/resourceSlice';
import { fetchSubjectById } from '@/lib/api/redux/subjectSlice';
import CommentSection from './CommentSubject';


import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

const SubjectPage: React.FC = () => {
  const { id: subjectId } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // Initialize navigate

  const { resources, loading, error } = useSelector((state: RootState) => state.resources);
  const subject = useSelector((state: RootState) => state.subjects.subject);

  const [rating, setRating] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const userRole = localStorage.getItem('role') || 'member_free';

  const currentUser = {
    _id: 'currentUserId',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  };

  useEffect(() => {
    if (subjectId) {
      dispatch(fetchResourcesBySubject(subjectId));
      dispatch(fetchSubjectById(subjectId));
    }
  }, [dispatch, subjectId]);

  const handleRating = (value: number) => setRating(value);
  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const canAccessResource = (allowedRoles: string[]): boolean => {
    return (
      userRole === 'admin' ||
      userRole === 'staff' ||
      userRole === 'member_premium' ||
      allowedRoles.includes(userRole)
    );
  };

  if (subjectId === undefined) {
    return <p className="text-red-500">No subject found.</p>;
  }

  return (
    <div className="min-h-screen ">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm 0">
          <div className="flex items-center space-x-3">
            <FaHome className="text-black text-lg" />
            <FaChevronRight className="text-black text-lg" />
            <span className="font-medium text-black text-lg">Môn học</span>
            <FaChevronRight className="text-black text-lg" />
            <span className="font-medium text-black text-lg">{subject ? subject.name : 'Loading...'}</span>
          </div>
        </nav>
        {/* Subject Title Section */}
        <div className="p-8 rounded-lg shadow-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 backdrop-blur-sm bg-white/10 border-t border-white/20">
          <h1 className="text-4xl font-bold text-white">{subject ? subject.name : 'Loading...'}</h1>
        </div>
        {/* Resources Section */}
        <section className="space-y-6">
          {loading ? (
            <p className="text-white">Loading resources...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : resources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource) => (
                <div key={resource.id} className="bg-white/30 rounded-lg p-8 shadow-lg backdrop-blur-md transform transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold mb-2 text-white">{resource.title}</h3>
                    <span className="text-xs font-semibold py-1 px-3 rounded-full bg-blue-500 text-white">{resource.type?.toUpperCase()}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xl font-semibold mb-2 text-white">Access:</span>
                    <span
                      className={`text-sm font-semibold py-1 px-3 rounded-full ${
                        resource.allowedRoles?.includes('member_premium') ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                      }`}
                    >
                      {resource.allowedRoles?.join(', ')}
                    </span>
                  </div>
                  {canAccessResource(resource.allowedRoles || []) ? (
                    resource.fileUrls &&
                    resource.fileUrls.length > 0 && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between space-x-2">
                          <h4 className="text-xl font-semibold mb-2 text-white">Tài liệu:</h4>
                          <ul className="flex space-x-4 text-blue-500 justify-end">
                            {resource.fileUrls.map((url, index) => (
                              <li key={index}>
                                <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center space-x-1">
                                  <span>
                                    {resource.type} {index + 1}
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="text-red-400 mt-4 hover:underline focus:outline-none">Nâng cấp Premium để xem tài liệu này</button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Yêu cầu Nâng cấp Premium</AlertDialogTitle>
                          <AlertDialogDescription>
                            Bạn cần nâng cấp lên tài khoản Premium để truy cập tài liệu này. Bạn có muốn nâng cấp ngay bây giờ?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Hủy</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              navigate('/payment');
                            }}
                          >
                            Nâng cấp
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No resources available for this subject.</p>
          )}
        </section>
        {/* Rating and Like Section */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-white">Đánh giá tài liệu:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => handleRating(star)} className="focus:outline-none">
                    <FaStar className={`w-6 h-6 transition-all duration-200 ${star <= rating ? 'text-yellow-400' : 'text-white'} hover:text-yellow-300`} />
                  </button>
                ))}
              </div>
              <span className="ml-2 text-white">({rating}/5)</span>
            </div>
            <button onClick={handleLike} className={`flex items-center ${isLiked ? 'text-red-500' : 'text-white'} hover:text-red-400 focus:outline-none`}>
              <FaHeart className="text-2xl" />
              <span className="ml-1 text-lg">{likes} Thích</span>
            </button>
          </div>
        </div>
        {/* Comment Section */}
        <h3 className="text-2xl font-semibold text-white mb-6">Bình luận</h3>
        <CommentSection postId={subjectId} videoId={null} currentUser={currentUser} />
      </main>
    </div>
  );
};

export default SubjectPage;

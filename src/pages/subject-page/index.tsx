import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Home, ChevronRight, Star, Heart } from 'lucide-react';
import { RootState, AppDispatch } from '@/lib/api/store';
import { fetchResourcesBySubject, fetchSubjectById } from '@/lib/api/redux/resourceSlice'; // Import fetchSubjectById
import CommentSection from './CommentSubject';

const SubjectPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>(); // Lấy courseId từ URL
  const dispatch = useDispatch<AppDispatch>();

  // Lấy dữ liệu resources và subject từ store
  const { resources, subject, loading, error } = useSelector((state: RootState) => state.resources);

  // Trạng thái của rating và likes
  const [rating, setRating] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Lấy role từ localStorage
  const userRole = localStorage.getItem('role') || 'guest'; // Mặc định là 'guest' nếu không có role

  // Gọi API để lấy dữ liệu resources và subject name
  useEffect(() => {
    if (courseId) {
      dispatch(fetchResourcesBySubject(courseId));
      dispatch(fetchSubjectById(courseId)); // Gọi thêm API để lấy thông tin môn học
    }
  }, [dispatch, courseId]);

  // Xử lý khi đánh giá (rating) khóa học
  const handleRating = (value: number) => {
    setRating(value);
  };

  // Xử lý khi người dùng click vào like
  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  // Hàm kiểm tra quyền truy cập dựa trên allowedRoles và userRole
  const canAccessResource = (allowedRoles: string[]): boolean => {
    if (userRole === 'admin' || userRole === 'staff') {
      return true; // Admin và staff có quyền truy cập tất cả tài liệu
    }
    if (userRole === 'member_premium') {
      return true; // Member premium có thể truy cập tất cả tài liệu
    }
    return allowedRoles.includes(userRole); // Member free chỉ có thể truy cập tài liệu cho phép
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Phần chính của trang */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          {/* Điều hướng */}
          <nav className="mb-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center space-x-4 py-4 text-sm">
                <Home className="text-gray-600" />
                <ChevronRight className="text-gray-400" />
                <span className="text-gray-600">Subjects</span>
                <ChevronRight className="text-gray-400" />
                <span className="text-gray-800 font-medium">{subject ? subject.name : 'Loading...'}</span>
              </div>
            </div>
          </nav>

          {/* Tiêu đề môn học */}
          <div className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-lg">
            <h1 className="text-4xl font-bold mb-4">{subject ? subject.name : 'Loading...'}</h1> {/* Hiển thị tên môn học */}
          </div>

          {/* Kiểm tra xem dữ liệu có đang được tải không */}
          {loading ? (
            <p>Loading resources...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Resources</h2>
              {resources.length > 0 ? (
                <ul className="list-disc pl-5">
                  {resources.map((resource) => (
                    <li key={resource._id} className="mb-2">
                      {canAccessResource(resource.allowedRoles) ? (
                        <a href={resource.fileUrls[0]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {resource.title}
                        </a>
                      ) : (
                        <p className="text-red-500">Bạn phải mua premium để có thể xem tài liệu này</p>
                      )}
                      <p>{resource.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No resources available for this subject.</p>
              )}
            </div>
          )}

          {/* Phần đánh giá và yêu thích */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-lg font-semibold mr-2">Rate this course:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => handleRating(star)} className="focus:outline-none">
                      {star <= rating ? (
                        <Star className="text-yellow-400 text-2xl" />
                      ) : (
                        <Star className="text-slate-400 text-2xl" />
                      )}
                    </button>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">({rating}/5)</span>
              </div>
              <button onClick={handleLike} className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500'} focus:outline-none`}>
                <Heart className="text-2xl" />
                <span>{likes} Likes</span>
              </button>
            </div>
          </div>

          {/* Phần bình luận */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-12">Comments</h3>
            <CommentSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubjectPage;

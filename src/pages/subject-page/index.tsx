import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Home, ChevronRight, Star, Heart } from 'lucide-react'; // Import icon từ lucide.dev
import CommentSection from './CommentSubject'; // Import phần comment

// Định nghĩa kiểu dữ liệu cho giảng viên
interface Lecturer {
  name: string;
  role: string;
  image: string;
}

// Trang chi tiết môn học
const SubjectPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>(); // Lấy courseId từ URL
  const subjectTitle = 'Advanced Web Development'; // Giả sử đây là tiêu đề của môn học, bạn có thể thay đổi tùy theo dữ liệu thực tế

  const lecturers: Lecturer[] = [
    {
      name: 'Dr. Jane Smith',
      role: 'Lead Instructor',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      name: 'Prof. John Doe',
      role: 'Guest Lecturer',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
  ];

  const [rating, setRating] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
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
                <span className="text-gray-800 font-medium">{courseId}</span> {/* courseId từ URL */}
              </div>
            </div>
          </nav>

          {/* Tiêu đề môn học */}
          <div className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-lg">
            <h1 className="text-4xl font-bold mb-4">{subjectTitle}</h1>
            <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-blue-100 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
              {courseId} {/* courseId từ URL */}
            </button>
          </div>

          {/* Nội dung tổng quan môn học */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-semibold">Course Overview</h2>
              <div className="bg-blue-100 text-blue-800 font-semibold py-1 px-3 rounded-full">{courseId}</div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            In this advanced web development course, students will dive deep into modern web technologies and best practices. The curriculum covers a wide range of topics including:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
            <li>Responsive design techniques</li>
            <li>Progressive Web Apps (PWAs)</li>
            <li>Serverless architectures</li>
            <li>Modern JavaScript frameworks and libraries</li>
            <li>Performance optimization strategies</li>
            <li>Web security best practices</li>
          </ul>

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

      {/* Phần giảng viên */}
      <section className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-8 text-center">Meet Your Instructors</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lecturers.map((lecturer, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={lecturer.image} alt={lecturer.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{lecturer.name}</h3>
                  <p className="text-sm text-gray-600">{lecturer.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubjectPage;

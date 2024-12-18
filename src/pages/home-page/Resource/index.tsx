import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/api/store'; // Đảm bảo đường dẫn chính xác
import { fetchAllResources } from '@/lib/api/redux/resourceSlice';
import { fetchSubjects } from '@/lib/api/redux/subjectSlice';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CirclePlay, FileText } from 'lucide-react';
import { toast } from 'sonner';

// Hàm lấy ngẫu nhiên 3 tài nguyên
const getRandomResources = (resources: any[], count: number) => {
  if (resources.length <= count) {
    return resources; // Nếu ít hơn hoặc bằng `count`, trả về toàn bộ
  }
  const shuffled = [...resources].sort(() => 0.5 - Math.random()); // Trộn ngẫu nhiên
  return shuffled.slice(0, count); // Lấy đúng `count` phần tử
};

const ResourceCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Lấy dữ liệu từ redux store
  const { resources, loading, error } = useSelector((state: RootState) => state.resources);
  const { subjects } = useSelector((state: RootState) => state.subjects);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth); // Kiểm tra xác thực

  // Fetch tài nguyên và subjects khi component mount
  useEffect(() => {
    dispatch(fetchAllResources());
    dispatch(fetchSubjects(null)); // Fetch tất cả subjects
  }, [dispatch]);

  // Animated container và item variants
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Hàm chọn icon dựa trên loại tài nguyên
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <BookOpen className="w-10 h-10 text-blue-600" />;
      case 'video':
        return <CirclePlay className="w-10 h-10 text-green-600" />;
      case 'document':
        return <FileText className="w-10 h-10 text-purple-600" />;
      default:
        return <BookOpen className="w-10 h-10 text-blue-600" />;
    }
  };

  // Lấy tên môn học từ subjectId
  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find((sub) => sub.id === subjectId);
    return subject ? subject.name : 'N/A'; // Nếu không tìm thấy, hiển thị "N/A"
  };

  // Kiểm tra trạng thái xác thực và xử lý đăng nhập nếu cần
  const handleClickViewContent = (resource: any) => {
    if (!isAuthenticated) {
      toast.error('Bạn cần đăng nhập để xem nội dung.'); // Hiển thị thông báo khi chưa đăng nhập
      navigate('/login'); // Chuyển hướng tới trang đăng nhập nếu chưa đăng nhập
    } else {
      navigate(`/subject/${resource.subject}`); // Chuyển hướng đến trang subject
    }
  };

  if (loading) {
    return <p className="text-center text-white">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  // Lấy ngẫu nhiên 3 tài nguyên
  const displayedResources = getRandomResources(resources, 3);

  return (
    <div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-blue-500/40 py-20 px-4 md:px-8 backdrop-blur-lg"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Tài nguyên giáo dục</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayedResources.map((resource) => (
            <motion.div
              key={resource.id}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
              className="bg-white/30 rounded-lg p-8 text-center shadow-lg backdrop-blur-md transform transition-all duration-300"
            >
              {getResourceIcon(resource.type || '')}
              <h3 className="text-xl font-semibold mb-2 text-white">{resource.title}</h3>
              <p className="text-gray-700 mb-4 line-clamp-2">{resource.description || 'No description available.'}</p>
              <p className="text-sm text-gray-500 mb-4">
                Môn: <span className="font-medium">{getSubjectName(resource.subject)}</span>
              </p>
              <motion.button
                onClick={() => handleClickViewContent(resource)} // Kiểm tra xác thực trước khi chuyển hướng
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Xem nội dung
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ResourceCard;

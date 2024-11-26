import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RootState, AppDispatch } from '@/lib/api/store';
import { fetchPosts } from '@/lib/api/redux/postSlice';

const PortCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { posts, loading } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
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

  // Lấy 4 bài viết mới nhất
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sắp xếp giảm dần
    .slice(0, 4); // Lấy 4 bài đầu tiên

  return (
    <div>
      <motion.div
        id="features"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 md:px-8"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Bài viết</h2>
        {loading ? (
          <p className="text-center text-white">Đang tải...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {latestPosts.map((item) => (
              <div
                key={item._id}
                className="bg-white/30 rounded-lg shadow-lg overflow-hidden backdrop-blur-lg transition duration-300 transform hover:shadow-2xl hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "https://via.placeholder.com/500x300"} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/500x400";
                      e.currentTarget.style.objectFit = "contain";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-700 mb-4">{item.content.slice(0, 50)}...</p>
                  <button
                    onClick={() => navigate(`/blog-detail/${item._id}`)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md w-full transition duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PortCard;

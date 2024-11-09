import React from 'react';
import { motion } from 'framer-motion';

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  image: string;
}
const posts: Post[] = [
  {
    id: 1,
    title: 'Toán học',
    content: 'Hướng dẫn đầy đủ về giải tích nâng cao và thống kê',
    authorId: 'userId1',
    tags: ['math', 'calculus', 'statistics'],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: 'images.unsplash.com/photo-1509228468518-180dd4864904',
  },
  {
    id: 2,
    title: 'Vật lý',
    content: 'Tài liệu học tập toàn diện về cơ học lượng tử',
    authorId: 'userId2',
    tags: ['physics', 'quantum mechanics'],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: 'images.unsplash.com/photo-1636466497217-26a8cbeaf0aa',
  },
  {
    id: 3,
    title: 'Hóa học',
    content: 'Hướng dẫn chi tiết về hóa học hữu cơ và vô cơ',
    authorId: 'userId3',
    tags: ['chemistry', 'organic', 'inorganic'],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: 'images.unsplash.com/photo-1603126957548-75de25e9dc15',
  },
  {
    id: 4,
    title: 'Sinh học',
    content: 'Tài liệu đầy đủ về sinh học phân tử và di truyền học',
    authorId: 'userId4',
    tags: ['biology', 'molecular biology', 'genetics'],
    createdAt: new Date(),
    updatedAt: new Date(),
    image: 'images.unsplash.com/photo-1532187863486-abf9dbad1b69',
  },
];

const PortCard: React.FC = () => {
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
      <motion.div id="features" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="py-20 px-4 md:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Bài viết</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {posts.map((item) => (
            <div key={item.id} className="bg-white/30 rounded-lg shadow-lg overflow-hidden backdrop-blur-lg transition duration-300 transform hover:shadow-2xl hover:scale-105">
              <div className="relative overflow-hidden">
                <img src={`https://${item.image}`} alt={item.title} className="w-full h-48 object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.content}</p>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md w-full transition duration-300 transform hover:scale-105 active:scale-95">
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PortCard;

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, HelpCircle } from 'lucide-react';
interface Resource {
  id: number;
  title: string;
  description: string;
  fileUrls: string[];
  type: string;
  subject: string;
  allowedRoles: string[];
}
const resources: Resource[] = [
  {
    id: 1,
    title: 'Bài báo nghiên cứu',
    description: 'Truy cập hàng nghìn bài báo được đánh giá',
    fileUrls: ['https://example.com/research-paper.pdf'],
    type: 'pdf',
    subject: 'subjectId1',
    allowedRoles: ['member_free', 'member_premium'],
  },
  {
    id: 2,
    title: 'Bài giảng video',
    description: 'Hướng dẫn và bài giảng video của chuyên gia',
    fileUrls: ['https://example.com/video-lecture.mp4'],
    type: 'video',
    subject: 'subjectId2',
    allowedRoles: ['member_premium'],
  },
  {
    id: 3,
    title: 'Bài kiểm tra thực hành',
    description: 'Bài kiểm tra toàn diện kèm lời giải',
    fileUrls: ['https://example.com/practice-test.pdf'],
    type: 'quiz',
    subject: 'subjectId3',
    allowedRoles: ['member_free', 'member_premium'],
  },
];
const ResourceCard: React.FC = () => {
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

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <BookOpen className="w-10 h-10 text-blue-600" />;
      case 'video':
        return <GraduationCap className="w-10 h-10 text-green-600" />;
      case 'quiz':
        return <HelpCircle className="w-10 h-10 text-purple-600" />;
      default:
        return <BookOpen className="w-10 h-10 text-blue-600" />;
    }
  };
  return (
    <div>
      {' '}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-blue-500/40 py-20 px-4 md:px-8 backdrop-blur-lg"
      >
        <h2 className="text-4xl font-bold text-center mb-12  text-white">Tài nguyên giáo dục</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto ">
          {resources.map((resource) => (
            <motion.div
              key={resource.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              className="bg-white/30 rounded-lg p-8 text-center shadow-lg backdrop-blur-md transform transition-all duration-300"
            >
              {getResourceIcon(resource.type)}

              <h3 className="text-xl font-semibold mb-2 text-white">{resource.title}</h3>
              <p className="text-gray-700 mb-4">{resource.description}</p>
              <motion.button
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

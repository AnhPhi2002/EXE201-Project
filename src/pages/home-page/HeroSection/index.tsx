import React from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.8]);

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-purple-200/20 via-pink-300/20 to-blue-300/20 backdrop-blur-lg">
        {/* Hero Section */}
        <motion.div style={{ opacity, scale }} className="relative h-screen bg-gradient-to-r  from-purple-500 via-pink-500 to-blue-400 fixed top-0 w-full z-0 backdrop-blur-md">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 ">
            <motion.h1 initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-bold mb-6 text-center max-w-full">
              Chào mừng đến với LearnUp
            </motion.h1>
            <motion.p initial={{ y: 50 }} animate={{ y: 0 }} transition={{ duration: 0.8 }} className="text-xl md:text-2xl mb-8 text-center max-w-2xl ">
              Tham gia cộng đồng học tập sôi động của chúng tôi và khám phá tiềm năng của bạn thông qua giáo dục cộng tác
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:opacity-90 transition duration-300"
            >
              Tìm hiểu thêm
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

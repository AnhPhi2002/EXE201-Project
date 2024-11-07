import React from 'react';
import { motion } from 'framer-motion';
import HomeQA from './home-q-and-a';
import HomeDocument from './home-documents';
import HomeReview from './home-review';
import CodingCourseSection from './home-course-ection/CodingCourseSection';



const HomePage: React.FC = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto ">
        {/* Coding Course Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 bg-white/30 backdrop-blur-lg border border-white/20 shadow-xl rounded-lg p-6"
        >
          <CodingCourseSection />
        </motion.div>



        {/* Home QA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 py-10   p-6"
        >
          <HomeQA />
        </motion.div>

        {/* Home Document Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16 py-10 p-6"
        >
          <HomeDocument />
        </motion.div>

        {/* Home Review Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16 py-10  p-6"
        >
          <HomeReview />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;

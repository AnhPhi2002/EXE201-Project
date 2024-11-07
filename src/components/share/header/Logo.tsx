import React from 'react';
import { motion } from 'framer-motion';

const Logo: React.FC = () => (
  <motion.div
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="flex items-center"
  >
    <div className="ml-2 flex items-center space-x-2">
      <div className="text-2xl font-bold text-purple-600">LearnUp</div>
      <div className="hidden md:block text-sm text-black font-medium  rounded-full px-3 py-1">
        Ideas change everything
      </div>
    </div>
  </motion.div>
);

export default Logo;

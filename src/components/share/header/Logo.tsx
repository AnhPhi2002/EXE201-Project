import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center ">
      <span className="font-bold text-purple-600 text-2xl ">LearnUp</span>
      <span className="text-gray-500 text-sm flex-1 text-left px-3">Ideas change everything</span>
    </div>
  );
};

export default Logo;

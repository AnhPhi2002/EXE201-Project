import React from 'react';

const Logo: React.FC = () => (
  <div className="flex items-center">
    <div className="ml-2 flex items-center space-x-2">
      <div className="text-2xl font-bold text-purple-600">LearnUp</div>
      <div className="hidden md:block text-sm text-black font-medium">Ideas change everything</div>
    </div>
  </div>
);

export default Logo;

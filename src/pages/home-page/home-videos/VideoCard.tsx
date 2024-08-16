import React, { useState } from 'react';

interface VideoCardProps {
  thumbnail: string;
  title: string;
  author: string;
  duration: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ thumbnail, title, author, duration }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="w-96 bg-white rounded-lg overflow-hidden shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img src={thumbnail} alt={title} className="w-full h-40 object-cover" />
        <span className="absolute bottom-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
          {duration}
        </span>
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 bg-white bg-opacity-70 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
               className="w-10 h-10 ml-1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.25l13.5 6.75-13.5 6.75V5.25z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{author}</p>
      </div>
    </div>
  );
};

export default VideoCard;

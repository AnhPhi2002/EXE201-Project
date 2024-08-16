import React from 'react';

const VideoThumbnail: React.FC = () => {
  return (
    <div className="w-1/2 bg-slate-100 bg-white">
      <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}>
        <img
          src="https://via.placeholder.com/400x250"
          alt="Instructor at whiteboard"
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default VideoThumbnail;

import React from 'react';
import FeaturedLabel from './FeaturedLabel';
import VideoDetailHome from './VideoDetailHome';
import VideoThumbnail from './VideoThumbnail';


const HomeTopVideo: React.FC = () => {
  return (
    <div className="relative flex items-center mx-auto mt-8">
      <FeaturedLabel />
      <VideoDetailHome />
      <VideoThumbnail />
    </div>
  );
};

export default HomeTopVideo;

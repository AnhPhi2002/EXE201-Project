import React, { useEffect } from 'react';

import HeroSection from './HeroSection';
import PortCard from './PostCard';
import ResourceCard from './Resource';
import MeetingCard from './MeetingCard';
// import CommentHome from './CommentHome';



const LandingPage: React.FC = () => {
  useEffect(() => {
    document.title = "Trang chủ | LearnUp"
  }, [])
  return (
    <div>
      <HeroSection />

      <div className="relative z-10 pt-screen">
        {/* Posts Section */}

        <PortCard />
        {/* Resources Section */}

        <ResourceCard />
        {/* Meeting Section */}
        <MeetingCard />
        {/* <CommentHome /> */}
      </div>
    </div>
  );
};

export default LandingPage;

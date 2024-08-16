import React from 'react';
import HomeQA from './home-q-and-a';
import HomeDocument from './home-documents';
import HomeReview from './home-review';
import HomeVideo from './home-videos';
import HomeTopVideo from './home-top-video';

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-[10%] py-10">
      <div className="max-w-7xl mx-auto">
      <div className="mb-16">
          <HomeTopVideo />
        </div>
      <div className="mb-16 ">
          <HomeVideo />
        </div>
        <div className="mb-16  py-10">
          <HomeQA />
        </div>
        <div className="mb-16 py-10">
          <HomeDocument />
        </div>
        <div className="mb-16  py-10">
          <HomeReview />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

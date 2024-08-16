import React from 'react';
import VideoCard from './VideoCard'; // Adjust the path based on your file structure

const HomeVideo: React.FC = () => {
  const videos = [
    {
      thumbnail: 'https://via.placeholder.com/320x180',
      title: 'To love is to be brave',
      author: 'KELLY CORRIGAN',
      duration: '15:00',
    },
    {
      thumbnail: 'https://via.placeholder.com/320x180',
      title: 'To love is to be brave',
      author: 'KELLY CORRIGAN',
      duration: '12:22',
    },
    {
      thumbnail: 'https://via.placeholder.com/320x180',
      title: 'To love is to be brave',
      author: 'KELLY CORRIGAN',
      duration: '9:55',
    },
  ];

  return (
    <div className="flex justify-between space-x-4 ">
      {videos.map((video, index) => (
        <VideoCard
          key={index}
          thumbnail={video.thumbnail}
          title={video.title}
          author={video.author}
          duration={video.duration}
        />
      ))}
    </div>
  );
};

export default HomeVideo;

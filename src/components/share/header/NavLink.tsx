import React from 'react';
import SearchIcon from '../../../components/icons/action-icons';
const NavLink: React.FC = () => {
  return (
    <div className="flex items-center space-x-6">
      <a href="#" className="text-gray-700 hover:text-gray-900">ABOUT</a>
      <a href="#" className="text-gray-700 hover:text-gray-900">BLOG</a>
      <a href="#" className="text-gray-700 hover:text-gray-900">REVIEW SUBJECT  </a>
      <a href="#" className="text-gray-700 hover:text-gray-900">FORUM</a>
      <a href="#" className="text-gray-700 hover:text-gray-900">Q&A</a>
      <a href="#" className="text-gray-700 hover:text-gray-900">Room</a>
      <a href="#" className="bg-purple-600  text-white px-4 py-2 rounded-md hover:bg-black">SIGN IN</a>
      <div>
        <SearchIcon  icon="search" />
      </div>
    </div>
  );
};

export default NavLink;

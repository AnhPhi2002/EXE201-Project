import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '../../../components/icons/action-icons'; // Biểu tượng Search

const NavLink: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Quản lý trạng thái hiển thị của ô tìm kiếm
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null); // Tham chiếu đến ô tìm kiếm

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSearch = () => {
    setIsSearchVisible(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 2000);
  };

  const closeSearchWithDelay = () => {
    // Thêm thời gian chờ trước khi đóng thanh tìm kiếm
    setTimeout(() => {
      setIsSearchVisible(false);
    }, 200);
  };

  return (
    <div className="flex items-center space-x-6">
      <Link to="/" className="text-gray-700 hover:text-gray-900 font-semibold">TRANG CHỦ</Link>
      <Link to="/about" className="text-gray-700 hover:text-gray-900 font-semibold">GIỚI THIỆU</Link>

      {/* Dropdown cho NỘI DUNG */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="text-gray-700 hover:text-gray-900 focus:outline-none flex items-center space-x-2"
        >
          <span className="font-semibold">NỘI DUNG</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute bg-white shadow-lg mt-2 py-2 rounded-md w-48 z-10">
            <Link to="/blog" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={() => setIsDropdownOpen(false)}>BÀI BLOG</Link>
            <Link to="/subject" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={() => setIsDropdownOpen(false)}>MÔN HỌC</Link>
            <Link to="/document" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={() => setIsDropdownOpen(false)}>TÀI LIỆU</Link>
            <Link to="/question" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={() => setIsDropdownOpen(false)}>GIẢI ĐÁP</Link>
            <Link to="/room" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={() => setIsDropdownOpen(false)}>PHÒNG</Link>
          </div>
        )}
      </div>

      <Link to="/sign-in" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-black font-semibold">ĐĂNG NHẬP</Link>

      {/* Tích hợp Search Icon với hiệu ứng mở ô tìm kiếm */}
      <div
        className="relative flex items-center"
        onMouseLeave={closeSearchWithDelay} // Đóng thanh tìm kiếm khi di chuyển chuột ra ngoài với thời gian chờ
      >
        <button
          className="text-gray-700 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-md transition-transform duration-300 ease-in-out"
          aria-label="Tìm kiếm"
          onMouseEnter={toggleSearch} // Mở thanh tìm kiếm khi di chuyển chuột vào biểu tượng
        >
          <SearchIcon icon="search" className={`transform ${isSearchVisible ? 'scale-125 rotate-12' : ''}`} />
        </button>
        <div
          className={`absolute right-0 flex items-center transition-all duration-300 ease-in-out ${
            isSearchVisible ? 'w-[34rem] opacity-100' : 'w-0 opacity-0'
          }`}
        >
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full py-2 px-8 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-50 transition-width duration-300 ease-in-out"
            onBlur={() => {
              if (!searchInputRef.current?.value) {
                setIsSearchVisible(false);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NavLink;

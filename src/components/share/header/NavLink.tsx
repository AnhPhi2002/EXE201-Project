import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '../../../components/icons/action-icons';

const NavLink: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Quản lý trạng thái đăng nhập
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra nếu có token trong localStorage => đã đăng nhập
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Xóa token khỏi localStorage khi đăng xuất
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); // Điều hướng về trang đăng nhập
  };

  return (
    <div className="flex items-center space-x-6">
      <Link to="/" className="text-gray-700 hover:text-gray-900 font-semibold">TRANG CHỦ</Link>
      <Link to="/about" className="text-gray-700 hover:text-gray-900 font-semibold">GIỚI THIỆU</Link>

      {/* Custom Select-style Dropdown for "NỘI DUNG" */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="text-gray-700 hover:text-gray-900 focus:outline-none flex items-center space-x-2"
        >
          <span className='font-semibold'>NỘI DUNG</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute bg-white shadow-lg mt-2 py-2 rounded-md w-48 z-10">
            <Link
              to="/blog"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              onClick={() => setIsDropdownOpen(false)}
            >
              BÀI BLOG
            </Link>
            <Link
              to="/subject"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              onClick={() => setIsDropdownOpen(false)}
            >
              MÔN HỌC
            </Link>
            <Link
              to="/document"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              onClick={() => setIsDropdownOpen(false)}
            >
              TÀI LIỆU
            </Link>
            <Link
              to="/question"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              onClick={() => setIsDropdownOpen(false)}
            >
              GIẢI ĐÁP
            </Link>
            <Link
              to="/room"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
              onClick={() => setIsDropdownOpen(false)}
            >
              PHÒNG
            </Link>
          </div>
        )}
      </div>

      {/* Hiển thị nút Đăng nhập hoặc Đăng xuất dựa trên trạng thái đăng nhập */}
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-black font-semibold"
        >
          ĐĂNG XUẤT
        </button>
      ) : (
        <Link to="/login" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-black font-semibold">
          ĐĂNG NHẬP
        </Link>
      )}

      <div>
        <SearchIcon icon="search" />
      </div>
    </div>
  );
};

export default NavLink;

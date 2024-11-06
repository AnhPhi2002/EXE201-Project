import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const NavLink: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  // Đóng dropdown khi nhấp chuột ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="hidden md:flex items-center space-x-12 ml-auto mr-8">
      <Link to="/" className="text-black hover:text-purple-600 font-medium">
        TRANG CHỦ
      </Link>
      <Link to="/about" className="text-black hover:text-purple-600 font-medium">
        GIỚI THIỆU
      </Link>
      <div
        className="dropdown relative"
        onMouseEnter={openDropdown}
        ref={dropdownRef}
      >
        <button className="flex items-center text-black hover:text-purple-600 font-medium">
          NỘI DUNG
          <ChevronDown className={`ml-1 transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        {isDropdownOpen && (
          <div
            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-3 z-50 border border-gray-100"
            onMouseLeave={closeDropdown}
          >
            <Link to="/blog" className="block px-6 py-2.5 text-gray-700 hover:bg-purple-50 font-medium">
              BÀI BLOG
            </Link>
            <Link to="/subject" className="block px-6 py-2.5 text-gray-700 hover:bg-purple-50 font-medium">
              MÔN HỌC
            </Link>
            <Link to="/document" className="block px-6 py-2.5 text-gray-700 hover:bg-purple-50 font-medium">
              TÀI LIỆU
            </Link>
            <Link to="/faq" className="block px-6 py-2.5 text-gray-700 hover:bg-purple-50 font-medium">
              GIẢI ĐÁP
            </Link>
            <Link to="/room" className="block px-6 py-2.5 text-gray-700 hover:bg-purple-50 font-medium">
              PHÒNG
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavLink;

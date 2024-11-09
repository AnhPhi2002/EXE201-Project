import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <nav className="hidden md:flex items-center space-x-6 ml-auto justify-end">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Link to="/" className="text-white hover:text-purple-400 font-medium backdrop-blur-md px-4 py-2 rounded-full">
          TRANG CHỦ
        </Link>
      </motion.div>
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <Link to="/about" className="text-white hover:text-purple-400 font-medium backdrop-blur-md px-4 py-2 rounded-full">
          GIỚI THIỆU
        </Link>
      </motion.div>
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <Link to="/contact" className="text-white hover:text-purple-400 font-medium backdrop-blur-md px-4 py-2 rounded-full">
          LIÊN HỆ
        </Link>
      </motion.div>
      <motion.div
        className="dropdown relative"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        onMouseEnter={openDropdown}
        ref={dropdownRef}
      >
        <div className="flex items-center text-white hover:text-purple-400 font-medium cursor-pointer px-4 py-2 rounded-full">
          NỘI DUNG
          <ChevronDown className={`ml-1 transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </div>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 mt-2 w-56 backdrop-blur-md bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100 rounded-xl shadow-md py-3 z-50 border border-white/20"
            onMouseLeave={closeDropdown}
          >
            <Link to="/blog" className="block px-6 py-2.5 text-gray-800 hover:bg-purple-50/40 font-medium rounded-md transition duration-200">
              BÀI BLOG
            </Link>
            <Link to="/subject" className="block px-6 py-2.5 text-gray-800 hover:bg-purple-50/40 font-medium rounded-md transition duration-200">
              MÔN HỌC
            </Link>
            <Link to="/document" className="block px-6 py-2.5 text-gray-800 hover:bg-purple-50/40 font-medium rounded-md transition duration-200">
              TÀI LIỆU
            </Link>
            <Link to="/faq" className="block px-6 py-2.5 text-gray-800 hover:bg-purple-50/40 font-medium rounded-md transition duration-200">
              GIẢI ĐÁP
            </Link>
            <Link to="/room" className="block px-6 py-2.5 text-gray-800 hover:bg-purple-50/40 font-medium rounded-md transition duration-200">
              PHÒNG
            </Link>
          </motion.div>
        )}
      </motion.div>
    </nav>
  );
};

export default NavLink;

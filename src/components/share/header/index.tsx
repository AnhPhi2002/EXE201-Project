import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/api/store';
import { logout } from '@/lib/api/redux/authSlice';
import Logo from './Logo';
import NavLink from './NavLink';
import { Search, Menu, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header: React.FC = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { profile } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false); // Đóng cả menu di động nếu đang mở
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.title = 'Trang Chủ | LearnUp';
  }, []);

  return (
    <motion.header className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/40 border-b border-white/20 shadow-md">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Logo />

          {/* Hiển thị NavLink khi menu mobile mở */}
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:flex items-center space-x-6 ml-auto justify-end`}>
            <NavLink />
          </div>

          <div className="flex items-center space-x-6">
            {/* Search bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 backdrop-blur-md shadow-md">
              <Search className="text-gray-500 w-5 h-5" />
              <input type="text" placeholder="Tìm kiếm..." className="bg-transparent border-none focus:outline-none ml-3 w-48 text-base text-gray-700 placeholder-gray-500" />
            </div>

            {/* User Profile or Login/Register */}
            {isAuthenticated ? (
              <div className="dropdown relative" onMouseEnter={() => setIsProfileDropdownOpen(true)} ref={dropdownRef}>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={profile?.avatar || 'https://example.com/default-avatar.jpg'} alt="User profile picture" />
                  <AvatarFallback>{profile?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>

                {isProfileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-3 w-40 backdrop-blur-md bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100 rounded-xl shadow-lg py-2 z-50 border border-white/20"
                    onMouseLeave={() => setIsProfileDropdownOpen(false)}
                  >
                    <Link to="/profile" className="block px-6 py-2.5 text-gray-800 hover:bg-purple-50/50 font-medium text-base rounded-md transition duration-200">
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-6 py-2.5 text-red-600 hover:bg-red-50/50 font-medium text-base rounded-md transition duration-200"
                    >
                      ĐĂNG XUẤT
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/login')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:opacity-90 font-medium shadow-md backdrop-blur-md"
                >
                  ĐĂNG NHẬP
                </button>
                <Link to="/register" className="border-2 border-pink-500 text-pink-500 px-6 py-2 rounded-full hover:bg-pink-500/10 font-medium backdrop-blur-md">
                  ĐĂNG KÝ
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button onClick={toggleMobileMenu} className="md:hidden p-2 text-purple-600 bg-gray-100 rounded-lg backdrop-blur-sm">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 space-y-3 bg-white rounded-xl shadow-lg mt-3 border border-gray-100">
          {/* Search bar */}
          <div className="px-6 pb-3 border-b border-gray-100">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search className="text-gray-500 w-5 h-5" />
              <input type="text" placeholder="Tìm kiếm..." className="bg-transparent border-none focus:outline-none ml-3 w-full text-base" />
            </div>
          </div>

          {/* Navigation Links */}
          <Link to="/" onClick={closeDropdown} className="block px-6 py-2 text-black hover:bg-purple-50 hover:text-purple-800 transition-colors duration-200 font-medium text-base">
            TRANG CHỦ
          </Link>
          <Link
            to="/about"
            onClick={closeDropdown}
            className="block px-6 py-2 text-black hover:bg-purple-50 hover:text-purple-800 transition-colors duration-200 font-medium text-base"
          >
            GIỚI THIỆU
          </Link>
          <Link
            to="/contact"
            onClick={closeDropdown}
            className="block px-6 py-2 text-black hover:bg-purple-50 hover:text-purple-800 transition-colors duration-200 font-medium text-base"
          >
            LIÊN HỆ
          </Link>

          {/* Dropdown Menu */}
          <button
            onClick={toggleDropdown}
            className="flex items-center w-full px-6 py-2 text-black hover:bg-purple-50 hover:text-purple-800 transition-colors duration-200 font-medium text-base"
          >
            NỘI DUNG
            <ChevronDown className={`ml-1 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isDropdownOpen && (
            <div className="pl-8 space-y-2">
              <Link
                to="/blog"
                onClick={closeDropdown}
                className="block px-6 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-800 transition-colors duration-200 font-medium text-base"
              >
                BÀI BLOG
              </Link>
              <Link
                to="/subject"
                onClick={closeDropdown}
                className="block px-6 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-800 transition-colors duration-200 font-medium text-base"
              >
                MÔN HỌC
              </Link>
              <Link
                to="/room"
                onClick={closeDropdown}
                className="block px-6 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-800 transition-colors duration-200 font-medium text-base"
              >
                PHÒNG
              </Link>
              <Link
                to="/payment"
                onClick={closeDropdown}
                className="block px-6 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-800 transition-colors duration-200 font-medium text-base"
              >
                PREMIUM
              </Link>
            </div>
          )}
        </div>
      )}
    </motion.header>
  );
};

export default Header;

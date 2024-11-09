import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/api/store';
import { logout } from '@/lib/api/redux/authSlice';
import Logo from './Logo';
import NavLink from './NavLink';
import { Search, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header: React.FC = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/40 border-b border-white/20 shadow-md"
    >
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
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="bg-transparent border-none focus:outline-none ml-3 w-48 text-base text-gray-700 placeholder-gray-500"
              />
            </div>

            {/* User Profile or Login/Register */}
            {isAuthenticated ? (
              <div className="dropdown relative" onMouseEnter={() => setIsProfileDropdownOpen(true)} ref={dropdownRef}>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                {isProfileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-3 w-40 backdrop-blur-md bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100 rounded-xl shadow-lg py-2 z-50 border border-white/20"
                    onMouseLeave={() => setIsProfileDropdownOpen(false)}
                  >
                    <Link
                      to="/profile"
                      className="block px-6 py-2.5 text-gray-800 hover:bg-purple-50/50 font-medium text-base rounded-md transition duration-200"
                    >
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
                <Link
                  to="/register"
                  className="border-2 border-pink-500 text-pink-500 px-6 py-2 rounded-full hover:bg-pink-500/10 font-medium backdrop-blur-md"
                >
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
    </motion.header>
  );
};

export default Header;

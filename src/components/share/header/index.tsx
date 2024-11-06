import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import NavLink from './NavLink';
import { Search, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header: React.FC = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Đóng dropdown khi nhấp chuột ra ngoài
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

  return (
    <header className="bg-white shadow-md fixed top-0 z-50 w-full">
      <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Logo />
          <NavLink />
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search className="text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="bg-transparent border-none focus:outline-none ml-3 w-48 text-base"
              />
            </div>

            {isLoggedIn ? (
              <div
                className="dropdown relative"
                onMouseEnter={() => setIsProfileDropdownOpen(true)}
                ref={dropdownRef}
              >
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                {isProfileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-lg py-2 z-50 border border-gray-100"
                    onMouseLeave={() => setIsProfileDropdownOpen(false)}
                  >
                    <Link
                      to="/profile"
                      className="block px-6 py-2.5 text-gray-700 hover:bg-purple-50 font-medium text-base"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-6 py-2.5 text-red-600 hover:bg-red-50 font-medium text-base"
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
                  className="bg-purple-600 text-white px-6 py-2 rounded-full hover:opacity-90 font-medium shadow-md"
                >
                  ĐĂNG NHẬP
                </button>
                <Link
                  to="/register"
                  className="border-2 border-purple-600 text-purple-600 px-6 py-2 rounded-full hover:bg-purple-50 font-medium"
                >
                  ĐĂNG KÝ
                </Link>
              </div>
            )}

            <button onClick={toggleMobileMenu} className="md:hidden p-2 text-purple-600 bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

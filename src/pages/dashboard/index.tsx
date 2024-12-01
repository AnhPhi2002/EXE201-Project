import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Menu, Sun, Moon, LogOut, Home, SquareLibrary, Newspaper, MessageCircle, Presentation, Users } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { RootState } from '@/lib/api/store';

const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { pathname } = useLocation();
  const { profile } = useSelector((state: RootState) => state.user); // Assuming profile is stored in Redux

  // List of tabs that will be shown
  const tabs = [
    { name: 'Home', icon: <Home className="h-5 w-5 mr-3 ml-2" />, path: 'home' },
    { name: 'Semester Management', icon: <SquareLibrary className="h-5 w-5 mr-3 ml-2" />, path: 'semester-management', permission: 'manage_semesters' },
    { name: 'Post Management', icon: <Newspaper className="h-5 w-5 mr-3 ml-2" />, path: 'post-management', permission: 'manage_posts' },
    { name: 'Comment Management', icon: <MessageCircle className="h-5 w-5 mr-3 ml-2" />, path: 'comment-management', permission: 'manage_comments' },
    { name: 'Meeting Management', icon: <Presentation className="h-5 w-5 mr-3 ml-2" />, path: 'meeting-management', permission: 'manage_meetings' },
  ];

  // Add "User Management" tab if the user is an admin
  if (profile?.role === 'admin') {
    tabs.splice(1, 0, { name: 'User Management', icon: <Users className="h-5 w-5 mr-3 ml-2" />, path: 'user-management' },
      { name: 'Semester Management', icon: <SquareLibrary className="h-5 w-5 mr-3 ml-2" />, path: 'semester-management', },
      { name: 'Post Management', icon: <Newspaper className="h-5 w-5 mr-3 ml-2" />, path: 'post-management'  },
      { name: 'Comment Management', icon: <MessageCircle className="h-5 w-5 mr-3 ml-2" />, path: 'comment-management' },
      { name: 'Meeting Management', icon: <Presentation className="h-5 w-5 mr-3 ml-2" />, path: 'meeting-management' },
    );
  }

  // Check user permissions
  const hasManageSemestersPermission = profile?.permissions?.includes('manage_semesters');
  const hasManageMeetingsPermission = profile?.permissions?.includes('manage_meetings');
  const hasManagePostsPermission = profile?.permissions?.includes('manage_posts');

  // Filter the tabs based on user permissions
  const filteredTabs = tabs.filter((tab) => {
    if (tab.permission === 'manage_semesters' && hasManageSemestersPermission) return true;
    if (tab.permission === 'manage_meetings' && hasManageMeetingsPermission) return true;
    if (tab.permission === 'manage_posts' && hasManagePostsPermission) return true;
    if (!tab.permission) return true; // Tabs without a permission requirement
    return false;
  });

  useEffect(() => {
    document.title = 'Dashboard | LearnUp';
  }, []);

  useEffect(() => {
    const currentTab = pathname.split('/').pop() || 'home';
    setActiveTab(currentTab);
  }, [pathname]);

  useEffect(() => {
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    setSidebarCollapsed(isCollapsed);
  }, []);

  const toggleSidebar = () => {
    const newCollapsedState = !sidebarCollapsed;
    setSidebarCollapsed(newCollapsedState);
    localStorage.setItem('sidebarCollapsed', newCollapsedState.toString());
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkModeState = !darkMode;
    setDarkMode(newDarkModeState);
    localStorage.setItem('darkMode', newDarkModeState.toString());
    document.documentElement.classList.toggle('dark', newDarkModeState);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-16' : 'w-54'} bg-black text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4">
          <button onClick={toggleSidebar} className="text-white focus:outline-none" aria-label="Toggle Sidebar">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-11">
          <ul>
            {filteredTabs.map((tab) => {
              return (
                <li className="mb-2" key={tab.path}>
                  <Link
                    to={`/dashboard/${tab.path}`}
                    className={`flex items-center p-2 py-3 w-full ${activeTab === tab.path ? 'bg-gray-700' : 'hover:bg-gray-700'} rounded transition-colors duration-200`}
                  >
                    {tab.icon}
                    {!sidebarCollapsed && <span className="whitespace-nowrap overflow-hidden">{tab.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-md">
          <div className="flex items-center justify-end p-4 relative">
            <Button className="mr-4" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <div className="relative">
              <Avatar className="flex items-center cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <AvatarImage src={profile?.avatar || 'https://example.com/default-avatar.jpg'} alt="User profile picture" />
                <AvatarFallback>{profile?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-md w-40">
                  <button className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left" onClick={handleLogout}>
                    <LogOut className="inline-block h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

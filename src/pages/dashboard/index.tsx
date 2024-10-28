import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Home, BarChart2, Users, Moon, Sun, Newspaper, MessageCircle, Presentation, TableProperties, SquareLibrary } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const { pathname } = useLocation();
  console.log({ pathname });
  console.log({ activeTab });
  
  
  // Tabs list
  const tabs = [
    { name: 'Home', icon: <Home className="h-5 w-5 mr-3 ml-2" />, path: 'home' },
    { name: 'Analytics', icon: <BarChart2 className="h-5 w-5 mr-3 ml-2" />, path: 'analytics' },
    { name: 'Semester Management', icon: <SquareLibrary className="h-5 w-5 mr-3 ml-2" />, path: 'semester-management' },
    { name: 'User Management', icon: <Users className="h-5 w-5 mr-3 ml-2" />, path: 'user-management' },
    { name: 'Post Management', icon: <Newspaper className="h-5 w-5 mr-3 ml-2" />, path: 'post-management' },
    { name: 'Comment Management', icon: <MessageCircle className="h-5 w-5 mr-3 ml-2" />, path: 'comment-management' },
    { name: 'Meeting Management', icon: <Presentation className="h-5 w-5 mr-3 ml-2" />, path: 'meeting-management' },
    { name: 'Permission Management', icon: <TableProperties className="h-5 w-5 mr-3 ml-2" />, path: 'permission-management' },
  ];

  // Cập nhật trạng thái activeTab dựa trên đường dẫn hiện tại
  useEffect(() => {
    const currentTab = pathname.split('/').pop() || 'home';
    setActiveTab(currentTab);
  }, [pathname]);

  // Lưu trạng thái sidebar vào localStorage
  useEffect(() => {
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    setSidebarCollapsed(isCollapsed);
  }, []);

  const toggleSidebar = () => {
    const newCollapsedState = !sidebarCollapsed;
    setSidebarCollapsed(newCollapsedState);
    localStorage.setItem('sidebarCollapsed', newCollapsedState.toString());
  };

  // Toggle dark mode và lưu vào localStorage
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
            {tabs.map((tab) => (
              <li className="mb-2" key={tab.path}>
                <Link
                  to={`/dashboard/${tab.path}`}
                  className={`flex items-center p-2 py-3 w-full ${activeTab === tab.path ? 'bg-gray-700' : 'hover:bg-gray-700'} rounded transition-colors duration-200`}
                >
                  {tab.icon}
                  {!sidebarCollapsed && <span className="whitespace-nowrap overflow-hidden">{tab.name}</span>}   
                 </Link>  {/*Sử dụng whitespace-nowrap để ngăn text xuống dòng và overflow-hidden để tránh hiển thị text quá dài. */}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-md ">
          <div className="flex items-center justify-end p-4">
            <Button className="mr-4" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Avatar className="flex items-center mr-2">
              <AvatarImage src="https://your-avatar-url.com" alt="User Avatar" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 px-6">
          <Outlet /> {/* Sử dụng Outlet để render các trang */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

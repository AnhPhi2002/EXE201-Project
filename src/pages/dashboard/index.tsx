import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Home, BarChart2, Users, Settings, Package, Moon, Sun } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab); // Cập nhật trạng thái activeTab
  };

  // Tạo chức năng chuyển đổi Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Áp dụng lớp CSS khi chế độ thay đổi
  // useEffect(() => {
  //   if (darkMode) {
  //     document.body.classList.add('dark');
  //     document.body.classList.remove('light');
  //   } else {
  //     document.body.classList.add('light');
  //     document.body.classList.remove('dark');
  //   }
  // }, [darkMode]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-16' : 'w-52'} bg-gray-800 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4">
          <button onClick={toggleSidebar} className="text-white focus:outline-none" aria-label="Toggle Sidebar">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-11">
          <ul>
            <li className="mb-4">
              <Link
                to="/dashboard" // Thay đổi đường dẫn thành /dashboard
                onClick={() => handleTabChange('home')}
                className={`flex items-center p-2 py-3 w-full ${activeTab === 'home' ? 'bg-gray-700' : 'hover:bg-gray-700'} rounded transition-colors duration-200`}
              >
                <Home className="h-5 w-5 mr-5 ml-2" />
                {!sidebarCollapsed && <span>Home</span>}
              </Link>

              <Link
                to="/dashboard/analytics" // Cập nhật đường dẫn cho Analytics
                onClick={() => handleTabChange('analytics')}
                className={`flex items-center p-2 py-3 w-full ${activeTab === 'analytics' ? 'bg-gray-700' : 'hover:bg-gray-700'} rounded transition-colors duration-200`}
              >
                <BarChart2 className="h-5 w-5 mr-5 ml-2" />
                {!sidebarCollapsed && <span>Analytics</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-md ">
          <div className="flex items-center justify-end p-4">

            <Button onClick={toggleDarkMode} className="mr-4">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Avatar className="flex items-center mr-2">
              <AvatarImage src="https://your-avatar-url.com" alt="User Avatar" />
              <AvatarFallback>AB</AvatarFallback> 
            </Avatar>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 px-6">
          <Outlet /> {/* Sử dụng Outlet để render trang Home và Analytics */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

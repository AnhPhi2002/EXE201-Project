import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout: React.FC = () => {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 ">
          <Outlet /> {/* Sử dụng Outlet để render trang Home và Analytics */}
    </main>
  );
};

export default DashboardLayout;
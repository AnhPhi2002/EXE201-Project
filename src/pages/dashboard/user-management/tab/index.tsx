// UserManagementDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent } from '@/components/ui/card';
import UserTable from './UserTable';
import { PaginationDashboardPage } from '../../pagination';
import FliterDashboard from '../FliterDashboard';
import * as XLSX from 'xlsx';
import { fetchAllUsers } from '@/lib/api/redux/userSlice';
import { RootState, UserRole, User } from '@/lib/api/types/types';
import { toast } from 'sonner';

const UserManagementDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state: RootState) => state.user);

  const [currentUserRole] = useState<UserRole>(
    (localStorage.getItem('role') as UserRole) || 'admin'
  );
  const [currentUserId] = useState<string>(localStorage.getItem('userId') || '');
  const [selectedMetric, setSelectedMetric] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchAllUsers() as any); // Type assertion to resolve dispatch type error
    toast.success('Success fetch userlist')
  }, [dispatch]);

  const exportToExcel = (data: User[]) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'User_Data.xlsx');
  };

  const filteredUsers = users.filter(
    (user) =>
      (selectedMetric === 'all' ? true : user.role === selectedMetric) &&
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <section className="bg-white p-6 mt-10 w-auto">
        <FliterDashboard
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetric}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onExport={() => exportToExcel(users)}
        />
        <Card>
          <CardContent>
            <UserTable
              users={currentUsers}
              currentUserRole={currentUserRole}
              currentUserId={currentUserId}
              onEdit={() => {}}
            />
          </CardContent>
        </Card>
        <div className="flex justify-end items-center mt-5">
          <PaginationDashboardPage
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  );
};

export default UserManagementDashboard;

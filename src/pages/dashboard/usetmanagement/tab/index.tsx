import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import FliterDashboard from '../FliterDashboard';
import UserTable from './UserTable';
import { PaginationDashboardPage } from '../../pagination';
import * as XLSX from 'xlsx';
import UpdateUser from '../UpdateUser';

// Định nghĩa kiểu dữ liệu cho người dùng
type UserRole = 'admin' | 'staff' | 'member_free' | 'member_premium';

interface User {
  _id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  permissions: string[];
  address: string;
  phone: string;
  avatar: string;
  gender: 'male' | 'female' | 'other';
  createdAt: string;
}

// Dữ liệu người dùng mẫu
const mockUsers: User[] = [
  {
    _id: 1,
    name: 'John 1 Doe',
    email: 'johndoe@example.com',
    password: 'password123',
    role: 'admin',
    permissions: ['manage_users', 'edit_content'],
    address: '123 Main St, Springfield',
    phone: '123-456-7890',
    avatar: 'https://i.pravatar.cc/150?img=1',
    gender: 'male',
    createdAt: '2023-01-01T12:00:00Z',
  },
];

const exportToExcel = (data: User[]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
  XLSX.writeFile(workbook, 'User_Data.xlsx');
};

const UserManagementDashboard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<string>('admin');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(mockUsers.length / itemsPerPage);

  const filteredUsers = mockUsers.filter(
    (user) =>
      (selectedMetric === 'all' ? true : user.role === selectedMetric) &&
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (userId: number) => {
    setCurrentUserId(userId);
    setIsDialogOpen(true); // Mở dialog
  };

  return (
    <div>
      <section className="bg-white p-6 mt-10 w-auto">
        <FliterDashboard
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetric}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onExport={() => exportToExcel(mockUsers)}
        />
        <Tabs defaultValue="all">
          <TabsContent value="all">
            <Card>
              <CardContent>
                <UserTable users={currentUsers} onEdit={handleEdit} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end items-center mt-5">
          <PaginationDashboardPage totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      </section>

      {/* Hiển thị component UpdateUser khi nhấn vào Update */}
      {currentUserId !== null && (
        <UpdateUser
          existingUser={mockUsers.find((user) => user._id === currentUserId)}
          userId={currentUserId.toString()}
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
        />
      )}
    </div>
  );
};

export default UserManagementDashboard;

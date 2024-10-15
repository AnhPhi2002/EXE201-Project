  import React, { useState } from 'react';
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
  import { MoreHorizontal } from 'lucide-react';
  import { Badge } from '@/components/ui/badge';
  import FliterDashboard from './FliterDashboard';
  import { Tabs, TabsContent } from '@/components/ui/tabs';
  import { Card, CardContent } from '@/components/ui/card';
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
  import { Button } from '@/components/ui/button';
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
  import { PaginationDashboardPage } from '../pagination';
  import * as XLSX from 'xlsx'; // Thêm thư viện XLSX

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

  // Hàm xuất dữ liệu sang Excel
  const exportToExcel = (data: User[]) => {
    const worksheet = XLSX.utils.json_to_sheet(data); // Chuyển đổi dữ liệu sang worksheet
    const workbook = XLSX.utils.book_new(); // Tạo workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users'); // Thêm worksheet vào workbook

    // Tải tệp Excel
    XLSX.writeFile(workbook, 'User_Data.xlsx');
  };

  const UserManagementDashboard: React.FC = () => {
    const [selectedMetric, setSelectedMetric] = useState<string>('admin');
    const [searchTerm, setSearchTerm] = useState<string>(''); // Thêm searchTerm
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null); // Lưu userId của người dùng cần cập nhật
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // Kiểm soát trạng thái mở dialog
    

    // Thiết lập số lượng người dùng trên mỗi trang
    const itemsPerPage = 8;
    const totalPages = Math.ceil(mockUsers.length / itemsPerPage);

    // Lọc người dùng dựa trên `selectedMetric` và `searchTerm`
    const filteredUsers = mockUsers.filter(
      (user) => (selectedMetric === 'all' ? true : user.role === selectedMetric) && user.name.toLowerCase().includes(searchTerm.toLowerCase()), // Tìm kiếm theo tên
    );

    // Lấy danh sách người dùng của trang hiện tại
    const currentUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };

  

    const handleDelete = (userId: number) => {
      console.log(`Delete user with ID: ${userId}`);
    };

    const handleEdit = (userId: number) => {
      setCurrentUserId(userId); // Lưu lại userId để truyền qua UpdateUser
      setIsDialogOpen(true); // Mở dialog
    };
  
    return (
      <div>
        <section className="bg-white p-6 mt-10 w-auto">
          <FliterDashboard
            selectedMetric={selectedMetric}
            setSelectedMetric={setSelectedMetric}
            searchTerm={searchTerm} // Truyền searchTerm
            setSearchTerm={setSearchTerm} // Truyền setSearchTerm
            onExport={() => exportToExcel(mockUsers)} // Truyền hàm exportToExcel
          />
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">Avatar</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead className="hidden md:table-cell">Created at</TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentUsers.length > 0 ? (
                        currentUsers.map((user) => (
                          <TableRow key={user._id}>
                            <TableCell className="hidden sm:table-cell">
                              <Avatar>
                                <AvatarImage src={user.avatar || 'default-avatar-url.png'} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-blue-100 text-blue-800 font-semibold rounded-full border-2 border-blue-200">
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.address}</TableCell>
                            <TableCell>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</TableCell>
                            <TableCell className="hidden md:table-cell">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>Update</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleEdit(user._id)}>Update</DropdownMenuItem>
                                  <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                      <span>Change role</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                      <DropdownMenuSubContent>
                                        <DropdownMenuItem>
                                          <span>Admin</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <span>Staff</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <span>Member</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <span>Member Premium</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                      </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                  </DropdownMenuSub>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center">
                            No users found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end items-center mt-5">
            <PaginationDashboardPage totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          </div>
        </section>
      </div>
    );
  };

  export default UserManagementDashboard;

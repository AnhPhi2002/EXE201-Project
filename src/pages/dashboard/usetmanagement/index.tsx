import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import FliterDashboard from './FliterDashboard';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PaginationDashboardPage } from '../pagination';

// Định nghĩa kiểu dữ liệu cho người dùng
interface User {
  _id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'staff' | 'member_free' | 'member_premium';
  permissions: string[];
  address: string;
  phone: string;
  avatar: string;
  gender: 'male' | 'female';
  createdAt: string;
}

// Dữ liệu người dùng mẫu
const mockUsers: User[] = [
  {
    _id: 1,
    name: 'John Doe',
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
  {
    _id: 2,
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    password: 'password123',
    role: 'staff',
    permissions: ['edit_content'],
    address: '456 Elm St, Springfield',
    phone: '987-654-3210',
    avatar: 'https://i.pravatar.cc/150?img=2',
    gender: 'female',
    createdAt: '2023-02-15T10:30:00Z',
  },
  {
    _id: 3,
    name: 'Alice Johnson',
    email: 'alicejohnson@example.com',
    password: 'password123',
    role: 'member_premium',
    permissions: [],
    address: '789 Oak St, Springfield',
    phone: '555-555-5555',
    avatar: 'https://i.pravatar.cc/150?img=3',
    gender: 'female',
    createdAt: '2023-03-10T14:15:00Z',
  },
  {
    _id: 4,
    name: 'Bob Williams',
    email: 'bobwilliams@example.com',
    password: 'password123',
    role: 'member_free',
    permissions: [],
    address: '321 Maple St, Springfield',
    phone: '111-222-3333',
    avatar: 'https://i.pravatar.cc/150?img=4',
    gender: 'male',
    createdAt: '2023-04-20T09:45:00Z',
  },
];

const UserManagementDashboard: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<string>('sales');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Thiết lập số lượng người dùng trên mỗi trang
  const itemsPerPage = 10; // Số người dùng trên mỗi trang
  const totalPages = Math.ceil(mockUsers.length / itemsPerPage); // Tổng số trang

  // Lấy danh sách người dùng của trang hiện tại
  const currentUsers = mockUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <section className="bg-white p-6 mt-10 w-auto">
        <FliterDashboard selectedMetric={selectedMetric} setSelectedMetric={setSelectedMetric} />
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
                      <TableHead>Permissions</TableHead>
                      <TableHead className="hidden md:table-cell">Created at</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Hiển thị người dùng theo trang */}
                    {currentUsers.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell className="hidden sm:table-cell">
                          <Avatar>
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>
                          <Badge>{user.role}</Badge>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.address}</TableCell>
                        <TableCell>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</TableCell>
                        <TableCell>{user.permissions.length > 0 ? user.permissions.join(', ') : 'No permissions'}</TableCell>
                        <TableCell className="hidden md:table-cell">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end items-center  mt-5">
{/* Hiển thị phân trang */}
          <PaginationDashboardPage totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      </section>
    </div>
  );
};

export default UserManagementDashboard;

import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table';
import TableUserRow from './TableUserRow';
import { User, UserRole } from '@/lib/api/types/types'; // Sử dụng các type từ types.ts
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/api/types/types'; // Thêm RootState vào types.ts để lấy state từ Redux

interface UserTableProps {
  users: User[];
  currentUserRole: UserRole;
  currentUserId: string;
  onEdit: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, currentUserRole, currentUserId, onEdit }) => {
  const loading = useSelector((state: RootState) => state.user.loading); // Kiểm tra trạng thái loading

  return (
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
        {loading ? (
          <TableRow>
            <TableCell colSpan={9} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        ) : users.length > 0 ? (
          users.map((user) => (
            <TableUserRow 
              key={user._id} 
              user={user} 
              currentUserRole={currentUserRole} 
              currentUserId={currentUserId} 
              onEdit={onEdit} 
            />
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
  );
};

export default UserTable;

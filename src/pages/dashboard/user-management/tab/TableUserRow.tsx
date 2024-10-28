import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import UserActionMenu from './UserActionMenu';
import UpdateUser from '../UpdateUser';  // Import UpdateUser để mở dialog

interface User {
  _id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  avatar: string;
  gender: string;
  createdAt: string;
}

interface TableUserRowProps {
  user: User;
  onEdit: (userId: number) => void;
}

const userTypeOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Staff', value: 'staff' },
  { label: 'Member', value: 'member' },
  { label: 'Member Premium', value: 'member_premium' },
];

const TableUserRow: React.FC<TableUserRowProps> = ({ user }) => {
  const [open, setOpen] = useState(false);  // Trạng thái để mở/đóng dialog UpdateUser

  const handleRoleChange = (newRole: string) => {
    console.log(`Change role of user ${user._id} to ${newRole}`);
  };

  const handleUpdateClick = () => {
    setOpen(true);  // Mở dialog khi nhấn "Update"
  };

  return (
    <>
      <TableRow>
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
          <UserActionMenu
            onUpdate={handleUpdateClick}  // Truyền hàm mở dialog cho UserActionMenu
            userTypeOptions={userTypeOptions}
            onRoleChange={handleRoleChange}
          />
        </TableCell>
      </TableRow>

      {/* Dialog UpdateUser */}
      <UpdateUser
        existingUser={user}
        open={open}
        setOpen={setOpen} 
      />
    </>
  );
};

export default TableUserRow;

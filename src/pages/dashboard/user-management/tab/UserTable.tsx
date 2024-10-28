import React from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from '@/components/ui/table';
import TableUserRow from './TableUserRow';

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

interface UserTableProps {
  users: User[];
  onEdit: (userId: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit }) => {
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
        {users.length > 0 ? (
          users.map((user) => (
            <TableUserRow key={user._id} user={user} onEdit={onEdit} />
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

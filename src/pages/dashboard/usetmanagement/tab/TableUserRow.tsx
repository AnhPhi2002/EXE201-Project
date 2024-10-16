import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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
import { MoreHorizontal } from 'lucide-react';

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
const userTypeOptions = [
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'Staff',
    value: 'staff',
  },
  {
    label: 'Member',
    value: 'member',
  },
  {
    label: 'Member Premium',
    value: 'member_premium',
  },
];
interface TableUserRowProps {
  user: User;
  onEdit: (userId: number) => void;
}

const TableUserRow: React.FC<TableUserRowProps> = ({ user, onEdit }) => {
  return (
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(user._id)}> {/* Gọi hàm onEdit */}
              Update
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Change role</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>                
                    {userTypeOptions.map((option) => (
                      <DropdownMenuItem key={option.value}>
                        <span>{option.label}</span>
                      </DropdownMenuItem>
                    ))}
                 <DropdownMenuSeparator />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default TableUserRow;

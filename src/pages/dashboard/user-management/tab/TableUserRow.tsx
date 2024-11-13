import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import UserActionMenu from './UserActionMenu';
import PermissionModal from './PermissionModal';
import { updateUserRole, updateUserPermissions } from '@/lib/api/redux/userSlice';
import { User, UserRole } from '@/lib/api/types/types';
import { AppDispatch } from '@/lib/api/store';

interface TableUserRowProps {
  user: User;
  currentUserRole: UserRole;
  currentUserId: string;
  onEdit: (userId: string) => void;
}

const userTypeOptions = [
  { label: 'Admin', value: 'admin' as UserRole },
  { label: 'Staff', value: 'staff' as UserRole },
  { label: 'Member Free', value: 'member_free' as UserRole },
  { label: 'Member Premium', value: 'member_premium' as UserRole },
];

const TableUserRow: React.FC<TableUserRowProps> = ({ user, currentUserRole, currentUserId, onEdit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isPermissionModalOpen, setPermissionModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(user.role || 'member_free');
  const [userPermissions, setUserPermissions] = useState<string[]>(user.permissions || []);

  const handleRoleChange = async (newRole: UserRole) => {
    try {
      await dispatch(updateUserRole({ userId: user._id, role: newRole })).unwrap();
      setUserRole(newRole);
      alert('Role updated successfully');
    } catch (error) {
      alert('Failed to update role');
    }
  };

  const handlePermissionUpdate = async (updatedPermissions: string[]) => {
    try {
      await dispatch(
        updateUserPermissions({ 
          userId: user._id, 
          permissions: updatedPermissions 
        })
      ).unwrap();
      setUserPermissions(updatedPermissions);
      alert('Permissions updated successfully');
    } catch (error) {
      alert('Failed to update permissions');
    }
  };

  const handleOpenPermissionModal = () => {
    setPermissionModalOpen(true);
  };

  const handleClosePermissionModal = () => {
    setPermissionModalOpen(false);
  };

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Avatar>
          <AvatarImage src={user.avatar || 'https://example.com/default-avatar.jpg'} />
          <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell className="font-medium">{user.name || 'Unknown User'}</TableCell>
      <TableCell>
        <Badge variant="outline" className="bg-blue-100 text-blue-800 font-semibold rounded-full border-2 border-blue-200">
          {userRole}
        </Badge>
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.phone || 'N/A'}</TableCell>
      <TableCell>{user.address || 'N/A'}</TableCell>
      <TableCell>{user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'N/A'}</TableCell>
      <TableCell className="hidden md:table-cell">
        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
      </TableCell>
      <TableCell>
        <UserActionMenu 
          userTypeOptions={userTypeOptions} 
          onRoleChange={handleRoleChange}
          onOpenPermissions={userRole === 'staff' ? handleOpenPermissionModal : undefined}
        />
        {isPermissionModalOpen && (
          <PermissionModal 
            userId={user._id} 
            initialPermissions={userPermissions}
            onClose={handleClosePermissionModal} 
            onSave={handlePermissionUpdate}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default TableUserRow;

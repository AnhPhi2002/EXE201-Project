import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import UserActionMenu from './UserActionMenu';
import PermissionModal from './PermissionModal';
import ConfirmationModal from './ConfirmationModal';
import { updateUserRole, updateUserPermissions, deleteUser } from '@/lib/api/redux/userSlice';
import { User, UserRole } from '@/lib/api/types/types';
import { AppDispatch } from '@/lib/api/store';
import { toast } from 'sonner';

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

const roleColors = {
  admin: 'bg-red-100 text-red-800 border-red-200',
  staff: 'bg-green-100 text-green-800 border-green-200',
  member_free: 'bg-blue-100 text-blue-800 border-blue-200',
  member_premium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

const defaultBadgeColor = 'bg-gray-200 text-gray-700 border-gray-200';  // Default badge color for 'N/A' values

const TableUserRow: React.FC<TableUserRowProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isPermissionModalOpen, setPermissionModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(user.role || 'member_free');
  const [userPermissions, setUserPermissions] = useState<string[]>(user.permissions || []);

  const handleRoleChange = async (newRole: UserRole) => {
    try {
      await dispatch(updateUserRole({ userId: user._id, role: newRole })).unwrap();
      setUserRole(newRole);
      toast.success('Cập nhật vai trò thành công');
    } catch (error) {
      toast.error('Cập nhật vai trò thất bại');
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
      toast.success('Cập nhật quyền thành công');
    } catch (error) {
      toast.error('Cập nhật quyền thất bại');
    }
  };

  const handleDeleteUser = async () => {
    try {
      await dispatch(deleteUser(user._id)).unwrap();
      toast.success('Xóa người dùng thành công');
      setConfirmationModalOpen(false); // Đóng modal sau khi xóa thành công
    } catch (error) {
      toast.error('Xóa người dùng thất bại');
    }
  };

  const openConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalOpen(false);
  };

  const handleOpenPermissionModal = () => {
    setPermissionModalOpen(true);
  };

  const handleClosePermissionModal = () => {
    setPermissionModalOpen(false);
  };

  const renderDefaultBadge = (value: string | null | undefined) => {
    return value ? value : <Badge variant="outline" className={defaultBadgeColor}>Default</Badge>;
  };

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Avatar>
          <AvatarImage src={user.avatar || 'https://example.com/default-avatar.jpg'} />
          <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
      </TableCell>
      <TableCell className="font-medium">{user.name || 'N/A'}</TableCell>
      <TableCell>
        <Badge variant="outline" className={`font-semibold rounded-full border-2 ${roleColors[userRole]}`}>
          {userRole.charAt(0).toUpperCase() + userRole.slice(1).replace('_', ' ')}
        </Badge>
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{renderDefaultBadge(user.phone)}</TableCell>
      <TableCell>{renderDefaultBadge(user.address)}</TableCell>
      <TableCell>{renderDefaultBadge(user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : null)}</TableCell>
      <TableCell className="hidden md:table-cell">
        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : renderDefaultBadge(null)}
      </TableCell>
      <TableCell>
        <UserActionMenu 
          userTypeOptions={userTypeOptions} 
          onRoleChange={handleRoleChange}
          onOpenPermissions={userRole === 'staff' ? handleOpenPermissionModal : undefined}
          onDelete={openConfirmationModal} // Mở modal xác nhận xóa khi nhấn nút xóa
        />
        {isPermissionModalOpen && (
          <PermissionModal 
            userId={user._id} 
            initialPermissions={userPermissions}
            onClose={handleClosePermissionModal} 
            onSave={handlePermissionUpdate}
          />
        )}
        {isConfirmationModalOpen && (
          <ConfirmationModal
            isOpen={isConfirmationModalOpen}
            title="Xác nhận xóa người dùng"
            message="Bạn có chắc chắn muốn xóa người dùng này không?"
            onConfirm={handleDeleteUser}
            onCancel={closeConfirmationModal}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

export default TableUserRow;

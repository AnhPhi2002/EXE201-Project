import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

type UserRole = 'admin' | 'staff' | 'member_free' | 'member_premium';

interface UserActionMenuProps {
  userTypeOptions: { label: string; value: UserRole }[];
  onRoleChange: (role: UserRole) => void;
  onOpenPermissions?: () => void;
}

const UserActionMenu: React.FC<UserActionMenuProps> = ({ userTypeOptions, onRoleChange, onOpenPermissions }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        
        {/* Submenu for Changing Role */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>Change Role</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {userTypeOptions.map((option) => (
              <DropdownMenuItem key={option.value} onClick={() => onRoleChange(option.value)}>
                <span>{option.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Option for Permissions (only appears if onOpenPermissions is provided) */}
        {onOpenPermissions && (
          <DropdownMenuItem onClick={onOpenPermissions}>
            <span>Permissions</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActionMenu;

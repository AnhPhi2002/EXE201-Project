import React from 'react';
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

interface UserActionMenuProps {
  onUpdate: () => void;  // Callback để mở dialog UpdateUser
  userTypeOptions: { label: string; value: string }[];
  onRoleChange: (role: string) => void;
}

const UserActionMenu: React.FC<UserActionMenuProps> = ({ onUpdate, userTypeOptions, onRoleChange }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={onUpdate}  // Gọi hàm onUpdate để mở dialog UpdateUser
        >
          Update
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>Change role</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {userTypeOptions.map((option) => (
                <DropdownMenuItem key={option.value} onClick={() => onRoleChange(option.value)}>
                  <span>{option.label}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActionMenu;

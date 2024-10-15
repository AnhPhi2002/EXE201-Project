import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CirclePlus } from 'lucide-react';
import React from 'react';

// Định nghĩa kiểu cho props (nếu có)
interface UpdateUserProps {
  // Nếu có các props khác bạn cần, bạn có thể thêm vào đây
  userId?: string; // Ví dụ: truyền ID người dùng cần cập nhật (nếu có)
}

export const UpdateUser: React.FC<UpdateUserProps> = ({ userId }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center">
            <CirclePlus className="h-5 w-5 mr-2" />
            Create User
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle> Create user</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Select>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="user_premium">User Premium</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Email
              </Label>
              <Input id="username" defaultValue="@peduarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Phone
              </Label>
              <Input id="username" defaultValue="@peduarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Address
              </Label>
              <Input id="username" defaultValue="@peduarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Gender
              </Label>
              <Select>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Male">Mate</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateUser;

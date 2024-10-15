import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CirclePlus } from 'lucide-react';
import { toast } from 'react-toastify';

// Schema dùng để validate form
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  role: z.string().min(1, { message: 'Role is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  address: z.string().optional(),
  gender: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: FormData = {
  name: '',
  role: '',
  email: '',
  phone: '',
  address: '',
  gender: '',
};

interface CreateUserProps {
  existingUser?: FormData; // Thêm prop để kiểm tra nếu user đã tồn tại
  userId?: string;
}

export const CreateUser: React.FC<CreateUserProps> = ({ existingUser, userId }) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: existingUser || defaultValues,
  });

  const { handleSubmit, control, formState: { errors }, reset } = methods;
  const navigate = useNavigate();

  // Xử lý khi form được submit
  const onSubmit = (data: FormData) => {
   
  };

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
            <DialogTitle>Create User</DialogTitle>
          </DialogHeader>

          {/* Sử dụng FormProvider để truyền form context xuống các thành phần */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                {/* Tên */}
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Name</Label>
                      <Input id="name" {...field} placeholder="Enter name" className="col-span-3" />
                      {errors.name && <p className="col-span-4 text-red-500">{errors.name.message}</p>}
                    </div>
                  )}
                />

                {/* Role */}
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">Role</Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Select role" />
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
                      {errors.role && <p className="col-span-4 text-red-500">{errors.role.message}</p>}
                    </div>
                  )}
                />

                {/* Email */}
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">Email</Label>
                      <Input id="email" {...field} placeholder="Enter email" className="col-span-3" />
                      {errors.email && <p className="col-span-4 text-red-500">{errors.email.message}</p>}
                    </div>
                  )}
                />

                {/* Phone */}
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">Phone</Label>
                      <Input id="phone" {...field} placeholder="Enter phone number" className="col-span-3" />
                    </div>
                  )}
                />

                {/* Address */}
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="address" className="text-right">Address</Label>
                      <Input id="address" {...field} placeholder="Enter address" className="col-span-3" />
                    </div>
                  )}
                />

                {/* Gender */}
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="gender" className="text-right">Gender</Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />
              </div>

              <DialogFooter>
                <Button type="submit">{existingUser ? 'Update Now' : 'Create Now'}</Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Mock API functions to simulate create and update user

// async function createUser(data: FormData) {
//   return new Promise((resolve) => setTimeout(resolve, 1000));
// }

// async function updateUser(userId: string | undefined, data: FormData) {
//   return new Promise((resolve) => setTimeout(resolve, 1000));
// }

export default CreateUser;

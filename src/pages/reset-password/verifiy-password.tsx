import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginLayout from '@/layouts/LoginLayout';

// Định nghĩa lược đồ Zod cho xác thực mật khẩu
const verifyPasswordSchema = z.object({
  newPassword: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
  confirmPassword: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Mật khẩu không khớp',
  path: ['confirmPassword'], // Gán lỗi vào trường confirmPassword
});

type VerifyPasswordFormData = z.infer<typeof verifyPasswordSchema>;

const VerifyPassword: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<VerifyPasswordFormData>({
    resolver: zodResolver(verifyPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    }
  });

  const { handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data: VerifyPasswordFormData) => {
    console.log(data);
    navigate('/login'); // Điều hướng về trang đăng nhập sau khi submit thành công
  };

  return (
    <LoginLayout>
      <div className="w-full max-w-md mx-auto mt-10">
        <h2 className="font-bold text-3xl text-center mb-2 -mt-2">Chào mừng đến với LearnUp</h2>
        <p className="text-center text-gray-600 mb-8">Nhập mật khẩu để khôi phục tài khoản của bạn</p>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                Mật khẩu mới
              </Label>
              <Input
                type="password"
                id="new-password"
                placeholder="Nhập mật khẩu mới"
                {...methods.register("newPassword")}
                className="w-full mt-1"
              />
              {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
            </div>
            <div>
              <Label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Xác nhận mật khẩu
              </Label>
              <Input
                type="password"
                id="confirm-password"
                placeholder="Nhập lại mật khẩu"
                {...methods.register("confirmPassword")}
                className="w-full mt-1"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <div>
              <Button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900">
                Xác nhận
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </LoginLayout>
  );
};

export default VerifyPassword;

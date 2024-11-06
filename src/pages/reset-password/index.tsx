import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import LoginLayout from "@/layouts/LoginLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Xác định lược đồ xác thực cho biểu mẫu với Zod
const resetPasswordSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }).nonempty({ message: 'Email là bắt buộc' })
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  const { handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data: ResetPasswordFormData) => {
    console.log(data);
    navigate('/verify-password'); // Điều hướng đến trang VerifyPassword
  };

  return (
    <LoginLayout>
      <div className="w-full max-w-md mx-auto">
        <h2 className="font-bold text-3xl text-center mb-2 -mt-2">Chào mừng đến với LearnUp</h2>
        <p className="text-center text-gray-600 mb-8">Nhập email để khôi phục mật khẩu</p>
        
        {/* Sử dụng FormProvider để cung cấp ngữ cảnh cho các trường form */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Nhập email của bạn"
                {...methods.register("email")}
                className="w-full mt-1"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900">
                Gửi
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </LoginLayout>
  );
};

export default ResetPasswordPage;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser } from '@/lib/api/redux/authSlice';
import { RootState, AppDispatch } from '@/lib/api/store';

// Các thành phần UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import LoginLayout from "@/layouts/LoginLayout";

// Định nghĩa lược đồ Zod cho biểu mẫu đăng ký
const registerSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }).nonempty({ message: 'Email là bắt buộc' }),
  name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự' }),
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
});

// Kiểu dữ liệu của biểu mẫu dựa trên lược đồ Zod
type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  // Khởi tạo useForm với zodResolver để tích hợp Zod vào React Hook Form
  const methods = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      name: '',
      password: ''
    }
  });

  const { handleSubmit, control, formState: { errors } } = methods;

  // Xử lý khi submit biểu mẫu
  const onSubmit = (data: RegisterFormInputs) => {
    dispatch(registerUser(data)).then((action) => {
      if (registerUser.fulfilled.match(action)) {
        navigate('/login');
      }
    });
  };

  return (
    <LoginLayout>
      <div className="w-full max-w-md mx-auto">
        <h2 className="font-bold text-3xl text-center mb-6">Chào mừng đến với LearnUp</h2>
        <p className="text-center text-gray-600 mb-16">Đăng ký tài khoản của bạn</p>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Trường Email */}
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="email"
                      placeholder="Nhập email của bạn"
                      {...field}
                      className="w-full"
                    />
                  )}
                />
              </FormControl>
              {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
            </FormItem>

            {/* Trường Tên */}
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Nhập họ và tên của bạn"
                      {...field}
                      className="w-full"
                    />
                  )}
                />
              </FormControl>
              {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
            </FormItem>

            {/* Trường Mật khẩu */}
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="password"
                      placeholder="Tạo mật khẩu"
                      {...field}
                      className="w-full"
                    />
                  )}
                />
              </FormControl>
              {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
            </FormItem>

            {/* Nút Đăng ký */}
            <div className="mt-4">
              <Button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900"
                disabled={loading}
              >
                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
              </Button>
            </div>

            {/* Hiển thị lỗi từ server nếu có */}
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        </FormProvider>
      </div>
    </LoginLayout>
  );
};

export default RegisterPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/lib/api/redux/authSlice';
import { RootState, AppDispatch } from '@/lib/api/store';

// Import các thành phần từ Shadcn
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoginLayout from '@/layouts/LoginLayout';

// Xác thực biểu mẫu với Zod
const loginSchema = z.object({
  email: z.string().email({ message: 'Địa chỉ email không hợp lệ' }).nonempty({ message: 'Email là bắt buộc' }),
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
});

// Kiểu dữ liệu đầu vào của biểu mẫu dựa trên schema
type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  // Sử dụng useForm từ react-hook-form với zod
  const methods = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { handleSubmit, formState: { errors } } = methods;

  // Xử lý submit form
  const onSubmit = (data: LoginFormInputs) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); 
    }
  }, [isAuthenticated, navigate]); 

  return (
    <LoginLayout>
      <div className="w-full max-w-md mx-auto">
        <h2 className="font-bold text-3xl text-center mb-6">Chào mừng đến với LearnUp</h2>
        <p className="text-center text-gray-600 mb-16">Đăng nhập vào tài khoản của bạn</p>

        {/* Bao bọc FormProvider quanh form để cung cấp ngữ cảnh */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Trường Email */}
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Controller
                  name="email"
                  control={methods.control}
                  render={({ field }) => (
                    <Input
                      type="email"
                      placeholder="Nhập địa chỉ email của bạn"
                      {...field}
                      className="w-full"
                    />
                  )}
                />
              </FormControl>
              {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
            </FormItem>

            {/* Trường Mật khẩu */}
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Controller
                  name="password"
                  control={methods.control}
                  render={({ field }) => (
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu của bạn"
                      {...field}
                      className="w-full"
                    />
                  )}
                />
              </FormControl>
              {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
            </FormItem>

            {/* Liên kết Quên mật khẩu */}
            <div className="text-right mt-2">
              <Link to="/reset-password" className="text-sm text-black hover:text-blue-800">
                Quên mật khẩu?
              </Link>
            </div>

            {/* Nút Submit */}
            <div className="mt-4">
              <Button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900" disabled={loading}>
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </div>

            {/* Thông báo lỗi */}
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        </FormProvider>

        <p className="mt-6 text-center text-sm text-gray-600">
          Bạn chưa có tài khoản?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-800">
            Đăng ký ngay.
          </Link>
        </p>
      </div>
    </LoginLayout>
  );
};

export default LoginPage;

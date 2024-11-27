import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/lib/api/redux/authSlice';
import { RootState, AppDispatch } from '@/lib/api/store';
import { toast } from 'sonner'; // Import thêm toast từ sonner

// Import các thành phần từ Shadcn
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LoginLayout from '@/layouts/LoginLayout';
import { useAppSelector } from '@/hooks/useRedux';
import { fetchUserInfo } from '@/lib/api/redux/userSlice';

const loginSchema = z.object({
  email: z.string().email({ message: 'Địa chỉ email không hợp lệ' }).nonempty({ message: 'Email là bắt buộc' }),
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Đăng nhập | LearnUp';
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);
  const user = useAppSelector((state: RootState) => state.user.profile);
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo());
    }
    if (isAuthenticated) {
      toast.success('Đăng nhập thành công!');
    }
  }, [dispatch, isAuthenticated]);

  const methods = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (error) {
      toast.error('Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.');
    }
  }, [error]);
  useEffect(() => {
    setTimeout(() => {
      if (user && token) {
        if (user?.role === 'admin') {
          navigate('/dashboard');
        } else if (user?.role === 'staff') {
          navigate('/staff');
        } else {
          navigate('/');
        }
      }
    }, 1000);
   
  }, [user]);

  return (
    <LoginLayout>
      <div className="">
        <h2 className="font-bold text-3xl text-center mb-6 text-white">Chào mừng đến với LearnUp</h2>
        <p className="text-center text-gray-200 mb-16">Đăng nhập vào tài khoản của bạn</p>

        {/* Bao bọc FormProvider quanh form để cung cấp ngữ cảnh */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Trường Email */}
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Controller
                  name="email"
                  control={methods.control}
                  render={({ field }) => (
                    <Input
                      type="email"
                      placeholder="Nhập địa chỉ email của bạn"
                      {...field}
                      className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 border-2 border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  )}
                />
              </FormControl>
              {errors.email && <FormMessage className="text-red-500">{errors.email.message}</FormMessage>}
            </FormItem>

            {/* Trường Mật khẩu */}
            <FormItem>
              <FormLabel className="text-white">Mật khẩu</FormLabel>
              <FormControl>
                <Controller
                  name="password"
                  control={methods.control}
                  render={({ field }) => (
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu của bạn"
                      {...field}
                      className="w-full p-3 rounded-md bg-gray-100 text-black placeholder-gray-500 border-2 border-transparent focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                  )}
                />
              </FormControl>
              {errors.password && <FormMessage className="text-red-500">{errors.password.message}</FormMessage>}
            </FormItem>

            {/* Liên kết Quên mật khẩu */}
            <div className="text-right mt-2">
              <Link to="/reset-password" className="text-sm text-white hover:text-blue-500">
                Quên mật khẩu?
              </Link>
            </div>

            {/* Nút Submit */}
            <div className="mt-6">
              <Button type="submit" className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition-colors duration-300" disabled={loading}>
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </div>

            {/* Thông báo lỗi */}
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        </FormProvider>

        <p className="mt-6 text-center text-sm text-gray-200">
          Bạn chưa có tài khoản?{' '}
          <Link to="/register" className="text-blue-700 hover:text-blue-500">
            Đăng ký ngay.
          </Link>
        </p>
      </div>
    </LoginLayout>
  );
};

export default LoginPage;

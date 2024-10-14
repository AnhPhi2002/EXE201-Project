import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import LoginLayout from "@/layouts/LoginLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { registerUser } from '@/lib/api/redux/authSlice';
import { RootState, AppDispatch } from '@/lib/api/store';

interface RegisterFormInputs {
  email: string;
  name: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);  // Không dùng isAuthenticated ở đây
  const navigate = useNavigate();

  // Sử dụng useForm từ react-hook-form
  const methods = useForm<RegisterFormInputs>({
    defaultValues: {
      email: '',
      name: '',
      password: ''
    }
  });

  const { handleSubmit, control, formState: { errors } } = methods;

  // Xử lý form submit
  const onSubmit = (data: RegisterFormInputs) => {
    dispatch(registerUser(data)).then((action) => {
      if (registerUser.fulfilled.match(action)) {
        // Khi đăng ký thành công, điều hướng đến trang đăng nhập
        navigate('/login');
      }
    });
  };

  return (
    <LoginLayout>
      <div className="w-full max-w-md">
        <h2 className="font-bold text-3xl text-center mb-6">LearnUp Welcome</h2>
        <p className="text-center text-gray-600 mb-16">Register your account</p>

        {/* Bao bọc form với FormProvider từ react-hook-form */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Field Email */}
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: 'Email is required' }}
                  render={({ field }) => (
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                      className="w-full"
                    />
                  )}
                />
              </FormControl>
              {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
            </FormItem>

            {/* Field Name */}
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Name is required' }}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      {...field}
                      className="w-full"
                    />
                  )}
                />
              </FormControl>
              {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
            </FormItem>

            {/* Field Password */}
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => (
                    <Input
                      type="password"
                      placeholder="Type to create a password"
                      {...field}
                      className="w-full"
                    />
                  )}
                />
              </FormControl>
              {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
            </FormItem>

            {/* Submit Button */}
            <div className="mt-4">
              <Button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </div>

            {/* Hiển thị lỗi nếu có */}
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        </FormProvider>
      </div>
    </LoginLayout>
  );
};

export default RegisterPage;

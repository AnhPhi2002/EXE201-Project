import LoginLayout from "@/layouts/LoginLayout";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { login } from '@/lib/api/redux/authSlice';
import { RootState, AppDispatch } from '@/lib/api/store';

// Import các thành phần từ Shadcn
import { FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  // Sử dụng useForm từ react-hook-form
  const methods = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { handleSubmit, formState: { errors } } = methods;

  // Xử lý form submit
  const onSubmit = (data: LoginFormInputs) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home'); 
    }
  }, [isAuthenticated, navigate]); 

  return (
    <LoginLayout>
      <div className="w-full max-w-md mx-auto">
        <h2 className="font-bold text-3xl text-center mb-6">LearnUp Welcome</h2>
        <p className="text-center text-gray-600 mb-16">Login to your account</p>

        {/* Bao bọc FormProvider quanh form để cung cấp ngữ cảnh */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Field Email */}
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Controller
                  name="email"
                  control={methods.control}
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

            {/* Field Password */}
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Controller
                  name="password"
                  control={methods.control}
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => (
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      className="w-full"
                    />
                  )}
                />
              </FormControl>
              {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
            </FormItem>

            {/* Forgot password link */}
            <div className="text-right mt-2">
              <Link to="/forget-password" className="text-sm text-black hover:text-blue-800">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <Button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>

            {/* Error message */}
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>
        </FormProvider>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-800">
            Sign up.
          </Link>
        </p>
      </div>
    </LoginLayout>
  );
};

export default LoginPage;

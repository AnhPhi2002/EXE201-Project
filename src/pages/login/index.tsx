import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginLayout from "@/layouts/LoginLayout";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";  // Assuming you have a Shadcn Button component
import { Input } from "@/components/ui/input";    // Assuming you have a Shadcn Input component
import { Label } from "@/components/ui/label";    // Assuming you have a Shadcn Label component

import { login } from '@/lib/api/redux/authSlice';  
import { RootState, AppDispatch } from '@/lib/api/store';



const LoginPage = () => {

  const dispatch: AppDispatch = useDispatch();  // Sử dụng dispatch từ Redux
  const navigate = useNavigate();  // Dùng để chuyển hướng khi đăng nhập thành công
  const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);  // Lấy trạng thái từ Redux

  // Quản lý state cho email và password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Xử lý form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  // useEffect để lắng nghe khi trạng thái isAuthenticated thay đổi
  useEffect(() => {
    if (isAuthenticated) {
      console.log('Login ');  // Console log trạng thái success

    }

  }, [isAuthenticated, navigate]);

  return (
    <LoginLayout>
      <div className="w-full max-w-md">
      <h2 className="font-bold text-3xl text-center mb-6">LearnUp Welcome</h2>
      <p className="text-center text-gray-600 mb-16">Login to your account</p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            className="w-full mt-1"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Cập nhật state email
          />
        </div>
        <div>
          <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            className="w-full mt-1"
            placeholder="Enter your full password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Cập nhật state password
          />
        </div>
        <div className="text-right">
          <Link to="/forget-password" className="text-sm text-black hover:text-blue-800">
            Forgot password?
          </Link>
        </div>
        <div>
          <Button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900"
            disabled={loading}  // Khi đang loading thì nút login sẽ bị disable
          >
            {loading ? 'Logging in...' : 'Login'}  {/* Hiển thị trạng thái loading */}
          </Button>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}  {/* Hiển thị lỗi nếu có */}
      </form>
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



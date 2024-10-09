import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';  // Import useNavigate để điều hướng
import LoginLayout from "@/layouts/LoginLayout";
import { Button } from "@/components/ui/button";  
import { Input } from "@/components/ui/input";    
import { Label } from "@/components/ui/label";    
import { registerUser } from '@/lib/api/redux/authSlice';  
import { RootState, AppDispatch } from '@/lib/api/store';  

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();  
  const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);  
  const navigate = useNavigate();  // Khai báo useNavigate để điều hướng

  // State để lưu thông báo đăng ký thành công
  const [successMessage, setSuccessMessage] = useState('');

  // Quản lý state cho email, name và password
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // Xử lý form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kiểm tra dữ liệu có được nhập đúng không trước khi dispatch
    if (!email || !name || !password) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    dispatch(registerUser({ email, name, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      setSuccessMessage('Register Successful');

      setTimeout(() => {
        navigate('/login');
      }, 2000); 
    }
  }, [isAuthenticated, navigate]);

  return (
    <LoginLayout>
      <div className="w-full max-w-md">
        <h2 className="font-bold text-3xl text-center mb-6">LearnUp Welcome</h2>
        <p className="text-center text-gray-600 mb-16">Register your account</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
            <Input
              type="email"
              id="email"
              className="w-full mt-1"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
            />
          </div>
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</Label>
            <Input
              type="text"
              id="name"
              className="w-full mt-1"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}  
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
            <Input
              type="password"
              id="password"
              className="w-full mt-1"
              placeholder="Type to create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  
            />
          </div>
          <div>
            <Button
              type="submit"
              className="w-full mt-4 bg-black text-white py-2 rounded-md hover:bg-gray-900"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}  
            </Button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}  
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
        </form>
      </div>
    </LoginLayout>
  );
};

export default RegisterPage;

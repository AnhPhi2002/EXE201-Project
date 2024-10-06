import React from 'react';
import { Button } from "@/components/ui/button";  // Assuming you have a Shadcn Button component
import { Input } from "@/components/ui/input";    // Assuming you have a Shadcn Input component
import { Label } from "@/components/ui/label";    // Assuming you have a Shadcn Label component
import LoginLayout from '@/layouts/LoginLayout';

const VerifyPassword = () => {
  return (
    <LoginLayout>
    <div className="w-full max-w-md mx-auto mt-10">
      <h2 className="font-bold text-3xl text-center mb-2 -mt-2">LearnUp Welcome</h2>
      <p className="text-center text-gray-600 mb-8">Enter your password to reset your account</p>
      <form className="space-y-6">
        <div>
          <Label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New password</Label>
          <Input
            type="password"
            id="new-password"
            className="w-full mt-1"
            placeholder="Enter your new password"
          />
        </div>
        <div>
          <Label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm password</Label>
          <Input
            type="password"
            id="confirm-password"
            className="w-full mt-1"
            placeholder="Enter your confirm password"
          />
        </div>
        <div>
          <Button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900">
            Submit
          </Button>
        </div>
      </form>
    </div>
    </LoginLayout>
  );
};

export default VerifyPassword;

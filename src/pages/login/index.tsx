import LoginLayout from "@/layouts/LoginLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";  // Assuming you have a Shadcn Button component
import { Input } from "@/components/ui/input";    // Assuming you have a Shadcn Input component
import { Label } from "@/components/ui/label";    // Assuming you have a Shadcn Label component

const LoginPage = () => {
  return (
    <LoginLayout>
      <div className="w-full max-w-md">
        <h2 className="font-bold text-3xl text-center mb-6">LearnUp Welcome</h2>
        <p className="text-center text-gray-600 mb-16">Login to your account</p>
        <form className="space-y-6">
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
            <Input
              type="email"
              id="email"
              className="w-full mt-1"
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
            <Input
              type="password"
              id="password"
              className="w-full mt-1"
              placeholder="Enter your full password"
            />
          </div>
          <div className="text-right">
            <Link to="/forget-password" className="text-sm  text-black hover:text-blue-800">Forgot password?</Link>
          </div>
          <div>
            <Button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900">
              Login
            </Button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-800">
            Sign up.
          </Link>
        </p>
      </div>
    </LoginLayout>
  );
};

export default LoginPage;

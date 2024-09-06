import LoginLayout from "@/layouts/LoginLayout";
import { Button } from "@/components/ui/button";  // Assuming you have a Shadcn Button component
import { Input } from "@/components/ui/input";    // Assuming you have a Shadcn Input component
import { Label } from "@/components/ui/label";    // Assuming you have a Shadcn Label component

const RegisterPage = () => {
  return (
    <LoginLayout>
      <div className="w-full max-w-md">
        <h2 className="font-bold text-3xl text-center mb-6">LearnUp Welcome</h2>
        <p className="text-center text-gray-600 mb-16">Register your account</p>
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
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</Label>
            <Input
              type="text"
              id="name"
              className="w-full mt-1"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
            <Input
              type="password"
              id="password"
              className="w-full mt-1"
              placeholder="Type to create a password"
            />
          </div>
          <div >
            <Button type="submit" className="w-full mt-4 bg-black text-white py-2 rounded-md hover:bg-gray-900">
              Register
            </Button>
          </div>
        </form>
      </div>
    </LoginLayout>
  );
};

export default RegisterPage;

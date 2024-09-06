import LoginLayout from "@/layouts/LoginLayout";
import { Button } from "@/components/ui/button";  // Assuming you have a Shadcn Button component
import { Input } from "@/components/ui/input";    // Assuming you have a Shadcn Input component
import { Label } from "@/components/ui/label";    // Assuming you have a Shadcn Label component

const ResetPasswordPage = () => {
  return (
    <LoginLayout>
      <div className="w-full max-w-md">
        <h2 className="font-bold text-3xl text-center mb-2 -mt-2">LearnUp Welcome</h2>
        <p className="text-center text-gray-600 mb-8">Enter your email to reset your password</p>
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
            <Button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </LoginLayout>
  );
};

export default ResetPasswordPage;

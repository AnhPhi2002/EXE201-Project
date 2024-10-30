import { ReactNode } from "react";
import LoginBackgroundImage from "@/assets/images/learnup.png";

type LoginLayoutProps = {
  children: ReactNode;
};

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className="font-geist w-screen h-screen flex">
    <div className="flex-1  bg-violet-200 hidden md:block">
      <img src={LoginBackgroundImage} alt="auth-background" className="w-full h-full object-cover " />
    </div>
    <div className="flex-1 flex items-center justify-center">{children}</div>
  </div>
  );
};
export default LoginLayout;

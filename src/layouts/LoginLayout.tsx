import { ReactNode } from "react";
import LoginBackgroundImage from "@/assets/images/ing1.png";
import { motion } from "framer-motion";

type LoginLayoutProps = {
  children: ReactNode;
};

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div className="font-geist w-screen h-screen flex">
      {/* Phần hình ảnh bên trái với hiệu ứng motion */}
      <motion.div
        className="flex-1 bg-violet-200 hidden md:block"
        initial={{ opacity: 0 }} // Bắt đầu với độ mờ 0
        animate={{ opacity: 1 }} // Hiển thị dần dần
        transition={{ duration: 1 }} // Thời gian chuyển động
      >
        <img src={LoginBackgroundImage} alt="auth-background" className="w-full h-full object-cover" />
      </motion.div>

      {/* Phần form đăng nhập bên phải với hiệu ứng motion */}
      <motion.div
        className="flex-1 flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-300 p-8"
        initial={{ opacity: 0,  }} // Bắt đầu với độ mờ 0 và dịch chuyển xuống
        animate={{ opacity: 5, }} // Hiển thị và dịch chuyển về vị trí ban đầu
        transition={{ duration: 0.8 }} // Thời gian chuyển động
      >
        {children}
      </motion.div>
    </div>
  );
};

export default LoginLayout;

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import Header from "@/components/share/header";
import Footer from "@/components/share/footer";
import ScrollToTop from "./ScrollToTop";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-300 relative overflow-hidden">
      <ScrollToTop /> {/* Thêm ScrollToTop vào đây */}

      <Header />

      <div className="relative z-10 pt-20 backdrop-blur-sm bg-white/10 border-t border-white/20">
        <main>
          {children}
        </main>

        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-auto"
        >
          <div className="backdrop-blur-lg bg-white/10 border-t border-white/20">
            <Footer />
          </div>
        </motion.div>
      </div>

      {/* Link bỏ qua đến nội dung chính */}
      <Link
        to="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white px-4 py-2 rounded-md"
      >
        Skip to main content
      </Link>
    </div>
  );
};

export default Layout;

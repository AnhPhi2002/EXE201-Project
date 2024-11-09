import React from "react";
import { Twitter, Facebook, Instagram, Linkedin, Github, ArrowUpCircle } from "lucide-react";

const GlassmorphismFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer>
      <div className="absolute mt-2 inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-lg"></div>
      <div className="relative backdrop-blur-md bg-white/30 border border-white/20 shadow-lg rounded-t-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Về Chúng Tôi</h3>
              <p className="text-black leading-relaxed">
                Chúng tôi tạo ra các giải pháp đổi mới cho các doanh nghiệp hiện đại, cam kết chất lượng và sự xuất sắc trong mỗi dự án.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Liên Kết Nhanh</h3>
              <ul className="space-y-2">
                {['Trang Chủ', 'Dịch Vụ', 'Danh Mục', 'Liên Hệ'].map((link) => (
                  <li key={link}>
                    <button className="text-black hover:text-white transition-colors duration-300">{link}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Thông Tin Liên Hệ</h3>
              <ul className="space-y-2">
                <li className="text-black">123 Đường Kinh Doanh</li>
                <li className="text-black">New York, NY 10001</li>
                <li className="text-black">contact@example.com</li>
                <li className="text-black">+1 (555) 123-4567</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Nhận Tin Tức</h3>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 bg-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-md text-gray-700 placeholder-gray-400"
                />
                <button className="mt-2 w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity duration-300">
                  Đăng Ký
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/30">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-black text-sm">
                © 2024 Your Company. Bảo lưu mọi quyền.
              </p>
              <div className="flex space-x-6">
                {[Twitter, Facebook, Instagram, Linkedin, Github].map((Icon, index) => (
                  <button
                    key={index}
                    aria-label={Icon.name}
                    className="text-white hover:text-purple-400 transform hover:scale-110 transition-all duration-300"
                  >
                    <Icon size={24} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={scrollToTop}
          aria-label="Cuộn lên đầu"
          className="absolute right-8 -top-6 p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
        >
          <ArrowUpCircle size={24} />
        </button>
      </div>
    </footer>
  );
};

export default GlassmorphismFooter;

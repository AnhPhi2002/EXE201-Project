import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPayment } from "@/lib/api/redux/paymentSlice";
import { RootState } from "@/lib/api/types/types";
import { AppDispatch } from "@/lib/api/store";
import PlanCard from "./PlanCard";
import PaymentDetail from "./PaymentDetail";
import { toast } from "sonner"; // Import toast từ sonner

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, checkoutUrl } = useSelector((state: RootState) => state.payment);
  const [showPayment, setShowPayment] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");

  const plan: Plan = {
    name: "Nâng cấp Premium",
    price: "50,000 VND",
    description: "Truy cập đầy đủ vào tài liệu và tài nguyên học tập độc quyền",
    features: [
      "Truy cập không giới hạn vào toàn bộ tài liệu học tập",
      "Tải tài liệu chất lượng cao",
      "Hỗ trợ ưu tiên từ đội ngũ hỗ trợ",
      "Tài liệu độc quyền dành riêng cho thành viên Premium",
      "Các khóa học bổ trợ miễn phí",
      "Bản cập nhật tài liệu hàng tháng",
    ],
  };

  // Hàm kiểm tra người dùng
  const validateUser = () => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    if (!token) {
      toast.error("Bạn cần đăng nhập để thực hiện thanh toán.");
      navigate("/login");
      return false; 
    }

    if (!name) {
      toast.error("Thông tin người dùng không hợp lệ, vui lòng đăng nhập lại.");
      localStorage.removeItem("token");
      navigate("/login");
      return false;
    }

    setUserName(name); 
    return true; 
  };

  useEffect(() => {
    document.title = "Định giá | LearnUp";
  }, []);

  useEffect(() => {
    validateUser(); 
  }, [navigate]);

  useEffect(() => {
    if (checkoutUrl) {
      toast.success("Đang chuyển hướng đến trang thanh toán...");
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  useEffect(() => {
    if (error) {
      toast.error("Đã xảy ra lỗi khi tải trang thanh toán, vui lòng thử lại.");
    }
  }, [error]);

  const handlePayment = async () => {
    if (!validateUser()) return; // Kiểm tra người dùng trước khi thực hiện thanh toán

    try {
      toast("Đang khởi tạo thanh toán, vui lòng chờ...");
      await dispatch(createPayment()).unwrap();
      toast.success("Khởi tạo thanh toán thành công, bạn sẽ được chuyển hướng!");
    } catch (err) {
      toast.error("Không thể khởi tạo thanh toán, vui lòng thử lại.");
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {!showPayment ? (
          <PlanCard plan={plan} onSelectPlan={() => setShowPayment(true)} />
        ) : (
          <PaymentDetail
            userName={userName}
            plan={plan}
            loading={loading}
            error={error}
            handlePayment={handlePayment}
            setShowPayment={setShowPayment}
          />
        )}
      </div>
    </section>
  );
};

export default PaymentPage;

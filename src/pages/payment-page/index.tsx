import { ArrowLeft, Check, CreditCard, QrCode } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPayment } from '@/lib/api/redux/paymentSlice';
import { RootState } from '@/lib/api/types/types';
import { AppDispatch } from '@/lib/api/store';

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
  const [userName, setUserName] = useState<string>('');

  // Gói nâng cấp Premium
  const plan: Plan = {
    name: "Nâng cấp Premium",
    price: "50,000 VND",
    description: "Truy cập đầy đủ vào tài liệu và tài nguyên học tập độc quyền",
    features: [
      "Truy cập không giới hạn vào toàn bộ tài liệu học tập",
      "Tải tài liệu chất lượng cao",
      "Hỗ trợ ưu tiên từ đội ngũ hỗ trợ",
      "Không quảng cáo",
      "Tài liệu độc quyền dành riêng cho thành viên Premium",
      "Các khóa học bổ trợ miễn phí",
      "Sử dụng ứng dụng trên nhiều thiết bị",
      "Tài khoản bảo mật cao",
      "Bản cập nhật tài liệu hàng tháng",
      "Cộng đồng học tập Premium"
    ]
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');

    if (!token) {
      alert('Bạn cần đăng nhập để có thể thực hiện thanh toán');
      navigate('/login');
      return;
    }

    if (name) {
      setUserName(name);
    } else {
      alert('Thông tin người dùng không hợp lệ, vui lòng đăng nhập lại');
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  const handlePayment = () => {
    dispatch(createPayment());
  };

  const PaymentDetail = () => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-2xl p-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-800">Thanh Toán Nâng Cấp</h2>
      
      <div className="text-center mb-4">
        <p className="text-lg font-medium text-gray-700">Chào, {userName}!</p>
      </div>
      
      <div className="mb-8 text-center">
        <img 
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
          alt="PayOsôi Logo" 
          className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg" 
        />
        <p className="text-gray-600 text-sm">Vui lòng chọn phương thức thanh toán bạn muốn sử dụng:</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="bg-white hover:bg-gray-50 text-indigo-600 font-semibold py-3 px-4 rounded-lg shadow transition duration-300 flex items-center justify-center">
          <QrCode className="mr-2" /> Quét mã QR
        </button>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow transition duration-300 flex items-center justify-center">
          <CreditCard className="mr-2" /> Thanh toán thẻ
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-inner mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Chi tiết thanh toán</h3>
        <p className="text-gray-600 mb-1">Gói: {plan.name}</p>
        <p className="text-gray-600 mb-1">Số tiền: {plan.price}</p>
        <p className="text-gray-600">Phương thức: PayOsôi</p>
      </div>
      <button 
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition duration-300 mb-4" 
        type="button"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? 'Đang xử lý...' : 'Xác nhận thanh toán'}
      </button>
      {error && (
        <p className="mt-4 text-center text-lg font-medium text-red-500">
          {error}
        </p>
      )}
      <button 
        className="text-indigo-600 hover:text-indigo-800 font-semibold text-center w-full flex items-center justify-center" 
        onClick={() => setShowPayment(false)}
      >
        <ArrowLeft className="mr-2" /> Quay lại
      </button>
    </div>
  );

  return (
    <section className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {!showPayment ? (
          <>
            <h2 className="text-4xl font-extrabold text-indigo-900 text-center mb-4">
              Nâng cấp để mở khóa tài liệu cao cấp
            </h2>
            <p className="text-xl text-indigo-700 text-center mb-12 max-w-3xl mx-auto">
              Hãy nâng cấp lên thành viên Premium để tận hưởng các tài nguyên học tập độc quyền và các tính năng bổ trợ cho việc học.
            </p>
            <div className="flex justify-center">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 w-full max-w-md">
                <div className="px-6 py-8">
                  <h3 className="text-2xl font-semibold text-indigo-900 mb-2">{plan.name}</h3>
                  <p className="text-4xl font-bold text-indigo-900 mb-4">
                    {plan.price}
                    <span className="text-lg font-normal text-indigo-600">/tháng</span>
                  </p>
                  <p className="text-indigo-600 mb-6">{plan.description}</p>
                  <ul className="mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center mb-2">
                        <Check className="text-green-500 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-300 bg-indigo-600 hover:bg-indigo-700 shadow-lg"
                    aria-label={`Choose ${plan.name}`}
                    onClick={() => setShowPayment(true)}
                  >
                    Chọn gói
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <PaymentDetail />
        )}
      </div>
    </section>
  );
};

export default PaymentPage;

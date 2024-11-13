import React, { useEffect } from "react";
import { FiXCircle } from "react-icons/fi";

const PaymentFailure: React.FC = () => {
  useEffect(() => {
    document.title = "Thanh toán thất bại | PayEase";
  }, []);

  const errorCode = `#ERR-${Math.random().toString(36).substr(2, 9)}`;
  const attemptedAmount = "50.000 VND"; // Có thể thay bằng dữ liệu thực nếu có

  const handleRetryPayment = () => {
    window.location.href = "/payment";
  };

  const handleContactSupport = () => {
    window.location.href = "/support";
  };

  return (
    <div className=" flex items-center justify-center p-[%4]">
      <div className="max-w-md w-full bg-white/80 rounded-2xl shadow-lg p-8 text-center">
        <div className="mb-8 animate-bounce">
          <FiXCircle className="mx-auto h-16 w-16 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thanh toán thất bại!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Chúng tôi rất tiếc, giao dịch thanh toán của bạn không thành công. Vui lòng kiểm tra lại thông tin thanh toán và thử lại.
        </p>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Mã lỗi</h2>
            <p className="text-gray-900 font-semibold">{errorCode}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Số tiền đã thử thanh toán</h2>
            <p className="text-gray-900 font-semibold">{attemptedAmount}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <button
            className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
            onClick={handleRetryPayment}
          >
            Thử lại
          </button>

          <button
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
            onClick={handleContactSupport}
          >
            Liên hệ hỗ trợ
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>Nếu bạn cho rằng đây là lỗi, vui lòng liên hệ đội ngũ hỗ trợ của chúng tôi.</p>
          <p className="mt-2">Email hỗ trợ: support@payease.com</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;

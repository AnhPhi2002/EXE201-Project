import React, { useEffect } from "react"; 
import { FiCheckCircle } from "react-icons/fi";

const PaymentSuccess: React.FC = () => {
  useEffect(() => {
    document.title = "Thanh toán thành công | PayEase";
  }, []);

  const transactionId = `#TRX-${Math.random().toString(36).substr(2, 9)}`;
  const amountPaid = "50.000 VND"; // Có thể cập nhật từ dữ liệu thực nếu có

  const handlePrint = () => {
    const printContent = document.getElementById("receipt-card"); // Lấy phần card thanh toán
    if (printContent) {
      // Mở cửa sổ in mới mà không có thanh công cụ trình duyệt
      const printWindow = window.open('', '', 'width=800,height=600');
      printWindow?.document.write('<html><head><title>Biên lai thanh toán LearnUp</title>');
      printWindow?.document.write('<style>body { font-family: Arial, sans-serif; margin: 0; padding: 0; }</style>'); // CSS cải thiện giao diện
      printWindow?.document.write('<style>@media print { .no-print { display: none; } }</style>'); // Ẩn phần .no-print khi in
      printWindow?.document.write('<style>html, body { width: 100%; height: 100%; overflow: hidden; }</style>'); // Hủy cuộn trang khi in
      printWindow?.document.write('</head><body>');
      printWindow?.document.write(printContent.innerHTML); // In nội dung phần card
      printWindow?.document.write('</body></html>');
      printWindow?.document.close();
      printWindow?.focus(); // Đảm bảo cửa sổ in được focus

      // In ra biên lai
      printWindow?.print();

      // Đảm bảo đóng cửa sổ sau khi in xong
      printWindow?.addEventListener('afterprint', () => {
        printWindow?.close(); // Đóng cửa sổ sau khi in xong
      });
    }
  };

  const handleBackToDashboard = () => {
    window.location.href = "/dashboard";
  };
  useEffect(() => {
    document.title = 'Thanh toán thành công| LearnUp';
  }, []);
  return (
    <div className="flex items-center justify-center p-[2%]">
      <div className="max-w-md w-full bg-white/80 rounded-2xl shadow-lg p-8 text-center" id="receipt-card">
        {/* Phần icon này sẽ bị ẩn khi in */}
        <div className="mb-8 animate-bounce no-print">
          <FiCheckCircle className="mx-auto h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thanh toán thành công!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Cảm ơn bạn đã thanh toán. Giao dịch đã được thực hiện thành công.
          Một email xác nhận đã được gửi đến địa chỉ email của bạn.
        </p>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Mã giao dịch</h2>
            <p className="text-gray-900 font-semibold">{transactionId}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-500 mb-2">Số tiền thanh toán</h2>
            <p className="text-gray-900 font-semibold">{amountPaid}</p>
          </div>
        </div>

        {/* Ẩn phần này khi in */}
        <div className="mt-8 space-y-4 no-print">
          <button
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200"
            onClick={handlePrint}
          >
            Tải biên lai
          </button>

          <button
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
            onClick={handleBackToDashboard}
          >
            Về trang chính
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

import React, { useState } from 'react';
import { ArrowLeft, QrCode } from 'lucide-react';
import { Plan } from '@/lib/api/types/paymentData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RootState } from '@/lib/api/store';
import { useSelector } from 'react-redux';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

interface PaymentDetailProps {
  userName: string;
  plan: Plan;
  loading: boolean;
  error: string | null;
  handlePayment: () => void;
  setShowPayment: (show: boolean) => void;
}

const PaymentDetail: React.FC<PaymentDetailProps> = ({ userName, plan, loading, error, handlePayment, setShowPayment }) => {
  const { profile } = useSelector((state: RootState) => state.user);

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-2xl p-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-800">Thanh Toán Nâng Cấp</h2>

      <div className="text-center mb-4">
        <p className="text-lg font-medium text-gray-700">Chào, {userName}!</p>
      </div>

      <div className="mb-8 text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src={profile?.avatar || 'https://example.com/default-avatar.jpg'} alt="PayOS Logo" />
          <AvatarFallback>u</AvatarFallback> {/* In case image fails */}
        </Avatar>
        <p className="text-gray-600 text-sm">Vui lòng chọn phương thức thanh toán bạn muốn sử dụng:</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-3 px-4 rounded-lg shadow transition duration-300 flex items-center justify-center">
          <QrCode className="mr-2" /> Quét mã QR
        </button>
        <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger className="bg-white hover:bg-gray-200 text-indigo-600 font-semibold py-3 px-4 rounded-lg shadow transition duration-300 flex items-center justify-center whitespace-nowrap">
     Thanh toán PayPal
  </DialogTrigger>

  <DialogContent className="p-6 rounded-lg shadow-lg max-w-md mx-auto bg-white">
    <DialogTitle className="text-xl font-semibold mb-4 text-center text-gray-800">Thanh toán PayPal (Đang phát triển)</DialogTitle>
    <DialogDescription className="text-center text-gray-600 mb-4">Bạn vừa lòng chọn phương thức thanh toán quét mã QR</DialogDescription>
    <div className="flex justify-center space-x-4">
      <DialogClose asChild>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">Hủy bỏ</button>
      </DialogClose>
    </div>
  </DialogContent>
</Dialog>

      </div>

      <div className="bg-white p-6 rounded-lg shadow-inner mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Chi tiết thanh toán</h3>
        <p className="text-gray-600 mb-1">Gói: {plan.name}</p>
        <p className="text-gray-600 mb-1">Số tiền: {plan.price}</p>
        <p className="text-gray-600">Phương thức: PayOS</p>
      </div>

      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition duration-300 mb-4"
        type="button"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? 'Đang xử lý...' : 'Xác nhận thanh toán'}
      </button>

      {error && <p className="mt-4 text-center text-lg font-medium text-red-500">{error}</p>}

      <button className="text-indigo-600 hover:text-indigo-800 font-semibold text-center w-full flex items-center justify-center" onClick={() => setShowPayment(false)}>
        <ArrowLeft className="mr-2" /> Quay lại
      </button>
    </div>
  );
};

export default PaymentDetail;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPayment } from '@/lib/api/redux/paymentSlice';
import { RootState } from '@/lib/api/types/types';
import { AppDispatch } from '@/lib/api/store';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { loading, error, checkoutUrl } = useSelector((state: RootState) => state.payment);
  const [userName, setUserName] = React.useState<string>('');

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

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg my-20">
      <h1 className="text-2xl font-semibold text-center mb-6">Update Premium Account</h1>

      <section className="mb-6">
        <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
        <form className="space-y-4">
          <label className="block">
            Full Name
            <input
              type="text"
              value={userName}
              readOnly
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
        </form>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-medium mb-4">Package Information</h2>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <p className="text-lg">Price: <span className="font-semibold">50,000 VND</span> / month</p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-medium mb-4">Payment Method</h2>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <p className="text-lg">Method: <span className="font-semibold">Transfer</span></p>
        </div>
      </section>

      <button
        type="button"
        onClick={handlePayment}
        disabled={loading}
        className={`w-full py-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition-colors ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Processing...' : 'Complete Payment'}
      </button>

      {error && (
        <p className="mt-4 text-center text-lg font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default PaymentPage;

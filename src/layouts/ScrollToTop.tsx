import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Cuộn lên đầu trang khi URL thay đổi
    window.scrollTo(0, 0);
  }, [location]);

  return null; // Không cần render gì cả
};

export default ScrollToTop;

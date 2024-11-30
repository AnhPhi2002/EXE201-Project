import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchUserInfo } from '@/lib/api/redux/userSlice';
import { RootState } from '@/lib/api/store';
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  roles: string[];
  children: ReactNode;
};

const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.profile);
  // const isLoading = useAppSelector((state: RootState) => state.user.loading);
  const token = localStorage.getItem('token');
  const [isInitialCheck, setIsInitialCheck] = useState(true);

  useEffect(() => {
    // Chỉ gọi fetchUserInfo nếu có token và chưa có user
    if (token && !user) {
      dispatch(fetchUserInfo()).then(() => {
        setIsInitialCheck(false);
      }).catch(() => {
        setIsInitialCheck(false);
      });
    } else {
      setIsInitialCheck(false);
    }
  }, [dispatch, token, user]);

  useEffect(() => {
    // Kiểm tra quyền sau khi load user xong
    if (!isInitialCheck && user) {
      const hasRequiredRole = roles.includes(user.role ?? '');
      
      if (!hasRequiredRole) {
        // Nếu không có quyền, chuyển về trang chủ
        navigate('/', { 
          state: { from: location.pathname },
          replace: true 
        });
      }
    }
  }, [isInitialCheck, user, roles, navigate, location]);

  // Render loading khi đang kiểm tra user ban đầu
  if (isInitialCheck) {
    return <div>Loading...</div>;
  }

  // Kiểm tra quyền trước khi render children
  if (!user || !roles.includes(user.role ?? '')) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
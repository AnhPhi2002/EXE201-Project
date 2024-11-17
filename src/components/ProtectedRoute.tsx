import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fetchUserInfo } from '@/lib/api/redux/userSlice';
import { RootState } from '@/lib/api/store';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = {
  roles: string[];
  children: ReactNode;
};
const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.profile);
  const isLoading = useAppSelector((state: RootState) => state.user.loading);
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) dispatch(fetchUserInfo());
  }, [dispatch]);
  useEffect(() => {
    if (!isLoading && !(user?.role && roles.includes(user.role))) {
      navigate('/');
    }
  }, [isLoading, user, navigate, roles]);
  return <>{children}</>;
};

export default ProtectedRoute;

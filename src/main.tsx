import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './index.css';
import { store } from './lib/api/store';
import HomePage from './pages/home-page';
import ErrorPage from './pages/error-page';
import Layout from './layouts';
import LoginPage from './pages/login';
import ResetPassword from './pages/reset-password';
import RegisterPage from './pages/register';
import VerifyPassword from './pages/reset-password/verifiy-password';
import VideoPage from './pages/video-page';
import QuestionPage from './pages/question-page';
import QuestionDetailPage from './pages/question-page/detail';
import SubjectPage from './pages/subject-page';
import CommentSubject from './pages/subject-page/CommentSubject';
import ProfilePage from './pages/profile-page';
import ProfileDetail from './pages/profile-page/ProfileDetail';
import Dashboard from './pages/dashboard';
import DashboardLayout from './layouts/dasboardlayout';
import HomeDashboard from './pages/dashboard/home-dashboard';
import AnalyticsDashboard from './pages/dashboard/analytics';

// Cấu hình router
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/video',
        element: <VideoPage />,
      },
      {
        path: '/question',
        element: <QuestionPage />,
      },
      {
        path: '/question/:id',
        element: <QuestionDetailPage />,
      },
      {
        path: '/subject',
        element: <SubjectPage />,
      },
      {
        path: '/subject/:courseId',  // Thêm route động cho subject
        element: <SubjectPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/profile-detail', // Sửa đường dẫn thành kebab-case
        element: <ProfileDetail />,
      },
      {
        path: '/comment',
        element: <CommentSubject />,
      },
    ],
  },
  // Các route bên ngoài layout chính
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/verify-password',
    element: <VerifyPassword />,
  },
  // {
  //   path: '/dashboard',
  //   element: <Dashboard />,
    
  // },
  {
    path: '/dashboard', // Đường dẫn dashboard
    element: <Dashboard />, // Layout chính cho Dashboard
    children: [
      {
        index: true, // Đây là trang mặc định khi vào /dashboard
        element: <HomeDashboard />, // Trang HomeDashboard mặc định
      },
      {
        path: '/dashboard/analytics', // Đường dẫn cho trang Analytics
        element: <AnalyticsDashboard />
      },
 
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer autoClose={3000} /> {/* Nếu dùng react-toastify */}
    </Provider>
  </React.StrictMode>,
);

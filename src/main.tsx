import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './index.css';
import { store } from './lib/api/store';
import HomePage from './pages/home-page';
import ErrorPage from './pages/error-page';
import Layout from './layouts';
import LoginPage from './pages/login';
import ResetPassword from './pages/reset-password';
import RegisterPage from './pages/register';
import VideoPage from './pages/video-page';
import QuestionPage from './pages/question-page';
import QuestionDetailPage from './pages/question-page/detail';
import ProfilePage from './pages/profile-page';
import ProfileDetail from './pages/profile-page/ProfileDetail';
import Dashboard from './pages/dashboard';
import { HomeDashboard } from './pages/dashboard/home-dashboard';
import UserManagementDashboard from './pages/dashboard/user-management/tab';
import BlogDetail from './pages/blog/blogdetail';
import ContactUs from './pages/contact-page';
import PostManagementDashboard from './pages/dashboard/post-management/post';
import CommentManagementDashboard from './pages/dashboard/comment-management';

import SemesterManagementDashboard from './pages/dashboard/semester-management';
import PaymentPage from './pages/payment-page';
import AboutUs from './pages/about-page';
import CodingCourseSection from './pages/search-subject/CodingCourseSection';
import { Toaster } from 'sonner';
import PaymentSuccess from './pages/pricingplans/PaymentSuccess';
import PaymentFailure from './pages/pricingplans/PaymentFailure';
import ProtectedRoute from './components/ProtectedRoute';
import SubjectPage from './pages/subject-page';
import StudyRoomPage from './pages/meeting-page/StudyRoomPage';
import MeetingManagementDashboard from './pages/dashboard/meeting-management/table/page';
import BlogSection from './pages/blog/bloghome';

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
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/profile-detail',
        element: <ProfileDetail />,
      },

      {
        path: '/blog',
        element: <BlogSection />,
      },

      {
        path: '/blog-detail/:id',
        element: <BlogDetail />,
      },
      {
        path: '/subject',
        element: <CodingCourseSection />,
      },
      {
        path: '/subject/:id',
        element: <SubjectPage />,
      },
      {
        path: '/contact',
        element: <ContactUs />,
      },
      {
        path: '/about',
        element: <AboutUs />,
      },
      {
        path: '/room',
        element: <StudyRoomPage />,
      },
      {
        path: '/payment',
        element: <PaymentPage />,
      },
      {
        path: '/payment/success',
        element: <PaymentSuccess />,
      },
      {
        path: '/payment/failure',
        element: <PaymentFailure />,
      },
    ],
  },

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
    path: '/dashboard',
    element: (
      <ProtectedRoute roles={['admin', 'staff']}>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard/',
        element: <HomeDashboard />,
      },
      {
        path: '/dashboard/home',
        element: <HomeDashboard />,
      },
      {
        path: '/dashboard/user-management',
        element: <UserManagementDashboard />,
      },
      {
        path: '/dashboard/post-management',
        element: <PostManagementDashboard />,
      },
      {
        path: '/dashboard/comment-management',
        element: <CommentManagementDashboard />,
      },
      {
        path: '/dashboard/meeting-management',
        element: <MeetingManagementDashboard />,
      },

      {
        path: '/dashboard/semester-management',
        element: <SemesterManagementDashboard />,
      },
    ],
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster closeButton position="top-right" richColors duration={2000} />
    </Provider>
  </React.StrictMode>,
);

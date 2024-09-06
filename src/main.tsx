// index.tsx
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
import { Toaster } from 'sonner';
import LoginPage from './pages/login';
import ResetPassword from './pages/reset-password';
import RegisterPage from './pages/register';
import VerifyPassword from './pages/reset-password/verifiy-password';
import VideoPage from './pages/video-page';



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
        element: <HomePage />
      },
      {
        path: '/home',
        element: <HomePage />
      },
      {
        path: '/video',
        element: <VideoPage />
      },

    ]
  },
  {
    path: '/login',
    element: (
    <LoginPage /> 
    ),
  },
  {
    path: '/register',
    element: (
    <RegisterPage /> 
    ),
  },
  {
    path: '/reset-password',
    element: (
    <ResetPassword /> 
    ),
  },
  {
    path: '/verifiy-password',
    element: (
    <VerifyPassword /> 
    ),
  },
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer autoClose={3000}  />
      <Toaster closeButton position="top-right" richColors duration={1000} />
    </Provider>
  </React.StrictMode>,
);

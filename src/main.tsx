// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './index.css';
import { store } from './lib/api/redux/store';
import HomePage from './pages/home-page';
import ErrorPage from './pages/error-page';
import Layout from './layouts';
import { Toaster } from 'sonner';

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

    ]
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

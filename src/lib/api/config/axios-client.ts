  import axios from 'axios';
  // const BASE_URL: string | undefined = import.meta.env.BACKEND_URL;
  // export const BASE_URL = 'https://learnup.work';

  // export const BASE_URL = 'http://localhost/:8080';
  const BASE_URL: string = import.meta.env.VITE_BACKEND_URL || 'https://learnup.work';
  console.log('BASE_URL', BASE_URL);

  export const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-type': 'application/json',
    },
  });

  axiosClient.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.Accept = 'application/json';
        config.headers['Content-Type'] = 'application/json';
      }
      return config;
    },
    (error) => Promise.reject(error)
  );


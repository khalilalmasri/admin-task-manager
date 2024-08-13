import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });
// const axiosInstance = axios.create({ baseURL: 'https://todo.int-vision.com' });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    // signIn: '/api/auth/sign-in',
    signIn: '/api/auth/login',
    signUp: '/api/auth/sign-up',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  company: {
    list: '/api/admin/company',
    details: '/api/admin/company',
    search: '/api/company/company',
    delete: '/api/admin/company',
    put: '/api/admin/company',
    create: '/api/admin/company',
    import: '/api/admin/import-company',
  },
  task: {
    list: '/api/admin/task',
    details: '/api/admin/task',
    search: '/api/task/task',
    delete: '/api/admin/task',
    put: '/api/admin/task',
    create: '/api/admin/task',
    import: '/api/admin/import-task',
  },
  user: {
    list: '/api/admin/user',
    details: '/api/admin/user',
    search: '/api/user/user',
    delete: '/api/admin/user',
    put: '/api/admin/user',
    create: '/api/admin/user',
    import: '/api/admin/import-user',
  },
  project: {
    list: '/api/admin/project',
    details: '/api/admin/project',
    search: '/api/user/project',
    delete: '/api/admin/project',
    put: '/api/admin/project',
    create: '/api/admin/project',
    import: '/api/admin/import-project',
  },
  staff: {
    list: '/api/admin/attendance',
    details: '/api/admin/attendance',
    search: '/api/attendance/attendance',
    delete: '/api/admin/attendance',
    put: '/api/admin/attendance',
    create: '/api/admin/attendance',
    import: '/api/admin/import-attendance',
  },
  chat: '/api/chat',
};


import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

export const invoiceAPI = {
  getAll: () => API.get('/invoices'),
  getById: (id) => API.get(`/invoices/${id}`),
  create: (data) => API.post('/invoices', data),
  nextNumber: () => API.get('/invoices/next-number'),
};

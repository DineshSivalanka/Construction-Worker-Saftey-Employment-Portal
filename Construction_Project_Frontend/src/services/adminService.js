import API from './api';

export const getDashboardStats = () => API.get('/admin/dashboard');
export const getWorkers = () => API.get('/admin/workers');
export const getContractors = () => API.get('/admin/contractors');
export const getAllJobs = () => API.get('/admin/jobs');

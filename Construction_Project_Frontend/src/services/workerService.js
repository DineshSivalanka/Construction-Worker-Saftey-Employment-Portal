import API from './api';

export const getJobs = () => API.get('/jobs');
export const getJobById = (id) => API.get(`/jobs/${id}`);
export const applyJob = (id) => API.post(`/jobs/${id}/apply`);
export const getApplications = () => API.get('/applications');

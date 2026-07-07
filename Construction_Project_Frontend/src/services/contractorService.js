import API from './api';

export const createJob = (payload) => API.post('/jobs', payload);
export const getMyJobs = () => API.get('/contractor/jobs');
export const getApplicants = (jobId) => API.get(`/jobs/${jobId}/applicants`);

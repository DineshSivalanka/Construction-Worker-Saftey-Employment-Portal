import api from "./api";

export const getWorkers = () => api.get("/admin/workers");

export const getContractors = () => api.get("/admin/contractors");

export const getJobs = () => api.get("/admin/jobs");

export const deleteUser = (userId) => api.delete(`/admin/users/${userId}`);

export const deleteJob = (jobId) => api.delete(`/admin/jobs/${jobId}`);

import api from "./api";

// Get Worker Profile
export const getWorkerProfile = async (id) => {
  return await api.get(`/workers/${id}`);
};

// Update Worker Profile
export const updateWorkerProfile = async (id, data) => {
  return await api.put(`/workers/${id}`, data);
};

// Get all open jobs
export const getAllJobs = async () => {
  return await api.get("/workers/jobs");
};

// Apply for a job
export const applyJob = async (jobId, workerId) => {
  return await api.post(`/workers/${workerId}/apply/${jobId}`);
};

// Get my applications
export const getMyApplications = async (workerId) => {
  return await api.get(`/workers/${workerId}/applications`);
};

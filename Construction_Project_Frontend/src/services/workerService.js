import api from "./api";

// Get Worker Profile
export const getWorkerProfile = async (id) => {
  return await api.get(`/workers/${id}`);
};

// Update Worker Profile
export const updateWorkerProfile = async (id, data) => {
  return await api.put(`/workers/${id}`, data);
};

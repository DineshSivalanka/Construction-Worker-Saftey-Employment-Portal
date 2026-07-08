import api from "./api";

// Create a new job
export const createJob = async (contractorId, jobData) => {
    return await api.post(`/contractors/${contractorId}/jobs`, jobData);
};

// Get all jobs posted by the contractor
export const getMyJobs = async (contractorId) => {
    return await api.get(`/contractors/${contractorId}/jobs`);
};

// Update a job
export const updateJob = async (jobId, jobData) => {
    return await api.put(`/contractors/jobs/${jobId}`, jobData);
};

// Delete a job
export const deleteJob = async (jobId) => {
    return await api.delete(`/contractors/jobs/${jobId}`);
};

// Get applicants for a job
export const getApplicants = async (jobId) => {
    return await api.get(`/contractors/jobs/${jobId}/applications`);
};

// Accept applicant
export const acceptApplicant = async (applicationId) => {
    return await api.put(`/contractors/applications/${applicationId}?status=ACCEPTED`);
};

// Reject applicant
export const rejectApplicant = async (applicationId) => {
    return await api.put(`/contractors/applications/${applicationId}?status=REJECTED`);
};

// Get Contractor Profile
export const getContractorProfile = async (id) => {
    return await api.get(`/contractors/${id}`);
};

// Update Contractor Profile
export const updateContractorProfile = async (id, data) => {
    return await api.put(`/contractors/${id}`, data);
};

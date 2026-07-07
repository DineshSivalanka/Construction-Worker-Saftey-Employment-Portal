import api from "./api";

// Get all jobs
export const getAllJobs = async () => {
    // Modified to match the actual Spring Boot Backend endpoint (/api/workers/jobs)
    return await api.get("/workers/jobs");
};

// Apply for a job
export const applyJob = async (jobId, workerId) => {
    // Modified to match the actual Spring Boot Backend endpoint (/api/workers/{workerId}/apply/{jobId})
    return await api.post(`/workers/${workerId}/apply/${jobId}`);
};

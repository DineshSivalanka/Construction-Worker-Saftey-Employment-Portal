package com.construction.portal.service;

import com.construction.portal.dto.WorkerDTO;
import com.construction.portal.entity.Job;
import com.construction.portal.entity.JobApplication;

import java.util.List;

public class ContractorReviewService {
    public static interface WorkerService {

        WorkerDTO getWorkerProfile(Integer workerId);

        WorkerDTO updateWorkerProfile(Integer workerId, WorkerDTO workerDTO);

        List<Job> getAllOpenJobs();

        String applyForJob(Integer workerId, Integer jobId);

        List<JobApplication> getApplications(Integer workerId);
    }
}

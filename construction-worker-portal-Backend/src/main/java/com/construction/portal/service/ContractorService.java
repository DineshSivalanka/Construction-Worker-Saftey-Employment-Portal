package com.construction.portal.service;

import java.util.List;

import com.construction.portal.dto.ContractorDTO;
import com.construction.portal.entity.Job;
import com.construction.portal.entity.JobApplication;

public interface ContractorService {

    ContractorDTO getProfile(Integer contractorId);

    ContractorDTO updateProfile(Integer contractorId, ContractorDTO dto);

    Job createJob(Integer contractorId, Job job);

    List<Job> getMyJobs(Integer contractorId);

    Job updateJob(Integer jobId, Job job);

    String deleteJob(Integer jobId);

    List<JobApplication> getApplicants(Integer jobId);

    String updateApplicationStatus(Integer applicationId, String status);
}
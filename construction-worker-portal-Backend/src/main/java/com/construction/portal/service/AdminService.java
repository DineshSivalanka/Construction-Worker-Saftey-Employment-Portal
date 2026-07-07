package com.construction.portal.service;

import java.util.List;

import com.construction.portal.entity.ContractorProfile;
import com.construction.portal.entity.Job;
import com.construction.portal.entity.User;
import com.construction.portal.entity.WorkerProfile;

public interface AdminService {

    List<User> getAllUsers();

    List<WorkerProfile> getAllWorkers();

    List<ContractorProfile> getAllContractors();

    List<Job> getAllJobs();

    String deleteUser(Integer userId);

    String deleteJob(Integer jobId);
}
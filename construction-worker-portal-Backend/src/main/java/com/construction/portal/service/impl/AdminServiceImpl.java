package com.construction.portal.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.construction.portal.entity.ContractorProfile;
import com.construction.portal.entity.Job;
import com.construction.portal.entity.User;
import com.construction.portal.entity.WorkerProfile;
import com.construction.portal.repository.ContractorRepository;
import com.construction.portal.repository.JobRepository;
import com.construction.portal.repository.UserRepository;
import com.construction.portal.repository.WorkerRepository;
import com.construction.portal.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final WorkerRepository workerRepository;
    private final ContractorRepository contractorRepository;
    private final JobRepository jobRepository;

    public AdminServiceImpl(UserRepository userRepository,
                            WorkerRepository workerRepository,
                            ContractorRepository contractorRepository,
                            JobRepository jobRepository) {

        this.userRepository = userRepository;
        this.workerRepository = workerRepository;
        this.contractorRepository = contractorRepository;
        this.jobRepository = jobRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<WorkerProfile> getAllWorkers() {
        return workerRepository.findAll();
    }

    @Override
    public List<ContractorProfile> getAllContractors() {
        return contractorRepository.findAll();
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public String deleteUser(Integer userId) {

        userRepository.deleteById(userId);

        return "User deleted successfully";
    }

    @Override
    public String deleteJob(Integer jobId) {

        jobRepository.deleteById(jobId);

        return "Job deleted successfully";
    }
}
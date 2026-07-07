package com.construction.portal.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.construction.portal.dto.WorkerDTO;
import com.construction.portal.entity.ApplicationStatus;
import com.construction.portal.entity.Job;
import com.construction.portal.entity.JobApplication;
import com.construction.portal.entity.JobStatus;
import com.construction.portal.entity.WorkerProfile;
import com.construction.portal.repository.JobApplicationRepository;
import com.construction.portal.repository.JobRepository;
import com.construction.portal.repository.WorkerRepository;
import com.construction.portal.service.WorkerService;

@Service
public class WorkerServiceImpl implements WorkerService {

    private final WorkerRepository workerRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository applicationRepository;

    public WorkerServiceImpl(
            WorkerRepository workerRepository,
            JobRepository jobRepository,
            JobApplicationRepository applicationRepository) {

        this.workerRepository = workerRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    @Override
    public WorkerDTO getWorkerProfile(Integer workerId) {

        WorkerProfile worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new RuntimeException("Worker not found"));

        WorkerDTO dto = new WorkerDTO();

        dto.setWorkerName(worker.getWorkerName());
        dto.setAge(worker.getAge());
        dto.setGender(worker.getGender());
        dto.setAddress(worker.getAddress());
        dto.setVillage(worker.getVillage());
        dto.setDistrict(worker.getDistrict());
        dto.setSkill(worker.getSkill());
        dto.setExperienceYears(worker.getExperienceYears());
        dto.setCurrentLocation(worker.getCurrentLocation());

        return dto;
    }

    @Override
    public WorkerDTO updateWorkerProfile(Integer workerId, WorkerDTO dto) {

        WorkerProfile worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new RuntimeException("Worker not found"));

        worker.setWorkerName(dto.getWorkerName());
        worker.setAge(dto.getAge());
        worker.setGender(dto.getGender());
        worker.setAddress(dto.getAddress());
        worker.setVillage(dto.getVillage());
        worker.setDistrict(dto.getDistrict());
        worker.setSkill(dto.getSkill());
        worker.setExperienceYears(dto.getExperienceYears());
        worker.setCurrentLocation(dto.getCurrentLocation());

        workerRepository.save(worker);

        return dto;
    }

    @Override
    public List<Job> getAllOpenJobs() {

        return jobRepository.findByStatus(JobStatus.OPEN);
    }

    @Override
    public String applyForJob(Integer workerId, Integer jobId) {

        if (applicationRepository.existsByJobJobIdAndWorkerWorkerId(jobId, workerId)) {
            return "You have already applied for this job.";
        }

        WorkerProfile worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new RuntimeException("Worker not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        JobApplication application = new JobApplication();
        application.setWorker(worker);
        application.setJob(job);
        application.setStatus(ApplicationStatus.PENDING);

        applicationRepository.save(application);

        return "Job application submitted successfully.";
    }

    @Override
    public List<JobApplication> getApplications(Integer workerId) {

        return applicationRepository.findByWorkerWorkerId(workerId);
    }
}
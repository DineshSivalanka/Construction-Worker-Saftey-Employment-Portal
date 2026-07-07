package com.construction.portal.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.construction.portal.dto.ContractorDTO;
import com.construction.portal.entity.ApplicationStatus;
import com.construction.portal.entity.ContractorProfile;
import com.construction.portal.entity.Job;
import com.construction.portal.entity.JobApplication;
import com.construction.portal.repository.ContractorRepository;
import com.construction.portal.repository.JobApplicationRepository;
import com.construction.portal.repository.JobRepository;
import com.construction.portal.service.ContractorService;

@Service
public class ContractorServiceImpl implements ContractorService {

    private final ContractorRepository contractorRepository;
    private final JobRepository jobRepository;
    private final JobApplicationRepository applicationRepository;

    public ContractorServiceImpl(
            ContractorRepository contractorRepository,
            JobRepository jobRepository,
            JobApplicationRepository applicationRepository) {

        this.contractorRepository = contractorRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    @Override
    public ContractorDTO getProfile(Integer contractorId) {

        ContractorProfile contractor = contractorRepository.findByUserUserId(contractorId)
                .orElseThrow(() -> new RuntimeException("Contractor not found"));

        ContractorDTO dto = new ContractorDTO();
        dto.setContractorName(contractor.getContractorName());
        dto.setAddress(contractor.getAddress());
        dto.setVillage(contractor.getVillage());
        dto.setDistrict(contractor.getDistrict());
        dto.setExperienceYears(contractor.getExperienceYears());
        dto.setCompletedProjects(contractor.getCompletedProjects());
        dto.setPreviousWorkDetails(contractor.getPreviousWorkDetails());

        return dto;
    }

    @Override
    public ContractorDTO updateProfile(Integer contractorId, ContractorDTO dto) {

        ContractorProfile contractor = contractorRepository.findByUserUserId(contractorId)
                .orElseThrow(() -> new RuntimeException("Contractor not found"));

        contractor.setContractorName(dto.getContractorName());
        contractor.setAddress(dto.getAddress());
        contractor.setVillage(dto.getVillage());
        contractor.setDistrict(dto.getDistrict());
        contractor.setExperienceYears(dto.getExperienceYears());
        contractor.setCompletedProjects(dto.getCompletedProjects());
        contractor.setPreviousWorkDetails(dto.getPreviousWorkDetails());

        contractorRepository.save(contractor);

        return dto;
    }

    @Override
    public Job createJob(Integer contractorId, Job job) {

        ContractorProfile contractor = contractorRepository.findByUserUserId(contractorId)
                .orElseThrow(() -> new RuntimeException("Contractor not found"));

        job.setContractor(contractor);

        return jobRepository.save(job);
    }

    @Override
    public List<Job> getMyJobs(Integer contractorId) {
        ContractorProfile contractor = contractorRepository.findByUserUserId(contractorId)
                .orElseThrow(() -> new RuntimeException("Contractor not found"));

        return jobRepository.findByContractorContractorId(contractor.getContractorId());
    }

    @Override
    public Job updateJob(Integer jobId, Job updatedJob) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        job.setJobTitle(updatedJob.getJobTitle());
        job.setDescription(updatedJob.getDescription());
        job.setLocation(updatedJob.getLocation());
        job.setWorkingHours(updatedJob.getWorkingHours());
        job.setSalary(updatedJob.getSalary());
        job.setWorkersRequired(updatedJob.getWorkersRequired());
        job.setExperienceRequired(updatedJob.getExperienceRequired());
        job.setStatus(updatedJob.getStatus());

        return jobRepository.save(job);
    }

    @Override
    public String deleteJob(Integer jobId) {

        jobRepository.deleteById(jobId);

        return "Job deleted successfully";
    }

    @Override
    public List<JobApplication> getApplicants(Integer jobId) {

        return applicationRepository.findByJobJobId(jobId);
    }

    @Override
    public String updateApplicationStatus(Integer applicationId, String status) {

        JobApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(ApplicationStatus.valueOf(status.toUpperCase()));

        applicationRepository.save(application);

        return "Application status updated successfully";
    }
}
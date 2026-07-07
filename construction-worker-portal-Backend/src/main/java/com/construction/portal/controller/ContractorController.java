package com.construction.portal.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.construction.portal.dto.ContractorDTO;
import com.construction.portal.entity.Job;
import com.construction.portal.entity.JobApplication;
import com.construction.portal.service.ContractorService;

@RestController
@RequestMapping("/api/contractors")
@CrossOrigin(origins = "http://localhost:3000")
public class ContractorController {

    private final ContractorService contractorService;

    public ContractorController(ContractorService contractorService) {
        this.contractorService = contractorService;
    }

    @GetMapping("/{contractorId}")
    public ContractorDTO getProfile(@PathVariable Integer contractorId) {
        return contractorService.getProfile(contractorId);
    }

    @PutMapping("/{contractorId}")
    public ContractorDTO updateProfile(
            @PathVariable Integer contractorId,
            @RequestBody ContractorDTO dto) {

        return contractorService.updateProfile(contractorId, dto);
    }

    @PostMapping("/{contractorId}/jobs")
    public Job createJob(
            @PathVariable Integer contractorId,
            @RequestBody Job job) {

        return contractorService.createJob(contractorId, job);
    }

    @GetMapping("/{contractorId}/jobs")
    public List<Job> getMyJobs(@PathVariable Integer contractorId) {
        return contractorService.getMyJobs(contractorId);
    }

    @PutMapping("/jobs/{jobId}")
    public Job updateJob(
            @PathVariable Integer jobId,
            @RequestBody Job job) {

        return contractorService.updateJob(jobId, job);
    }

    @DeleteMapping("/jobs/{jobId}")
    public String deleteJob(@PathVariable Integer jobId) {
        return contractorService.deleteJob(jobId);
    }

    @GetMapping("/jobs/{jobId}/applications")
    public List<JobApplication> getApplicants(@PathVariable Integer jobId) {
        return contractorService.getApplicants(jobId);
    }

    @PutMapping("/applications/{applicationId}")
    public String updateApplicationStatus(
            @PathVariable Integer applicationId,
            @RequestParam String status) {

        return contractorService.updateApplicationStatus(applicationId, status);
    }
}
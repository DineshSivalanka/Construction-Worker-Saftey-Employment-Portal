package com.construction.portal.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.construction.portal.dto.WorkerDTO;
import com.construction.portal.entity.Job;
import com.construction.portal.entity.JobApplication;
import com.construction.portal.service.WorkerService;

@RestController
@RequestMapping("/api/workers")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkerController {

    private final WorkerService workerService;

    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    @GetMapping("/{workerId}")
    public WorkerDTO getProfile(@PathVariable Integer workerId) {
        return workerService.getWorkerProfile(workerId);
    }

    @PutMapping("/{workerId}")
    public WorkerDTO updateProfile(
            @PathVariable Integer workerId,
            @RequestBody WorkerDTO dto) {

        return workerService.updateWorkerProfile(workerId, dto);
    }

    @GetMapping("/jobs")
    public List<Job> getOpenJobs() {
        return workerService.getAllOpenJobs();
    }

    @PostMapping("/{workerId}/apply/{jobId}")
    public String applyJob(
            @PathVariable Integer workerId,
            @PathVariable Integer jobId) {

        return workerService.applyForJob(workerId, jobId);
    }

    @GetMapping("/{workerId}/applications")
    public List<JobApplication> getApplications(
            @PathVariable Integer workerId) {

        return workerService.getApplications(workerId);
    }
}
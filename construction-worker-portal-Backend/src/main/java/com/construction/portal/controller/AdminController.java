package com.construction.portal.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.construction.portal.entity.ContractorProfile;
import com.construction.portal.entity.Job;
import com.construction.portal.entity.User;
import com.construction.portal.entity.WorkerProfile;
import com.construction.portal.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:5174"})
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/workers")
    public List<WorkerProfile> getAllWorkers() {
        return adminService.getAllWorkers();
    }

    @GetMapping("/contractors")
    public List<ContractorProfile> getAllContractors() {
        return adminService.getAllContractors();
    }

    @GetMapping("/jobs")
    public List<Job> getAllJobs() {
        return adminService.getAllJobs();
    }

    @DeleteMapping("/users/{userId}")
    public String deleteUser(@PathVariable Integer userId) {
        return adminService.deleteUser(userId);
    }

    @DeleteMapping("/jobs/{jobId}")
    public String deleteJob(@PathVariable Integer jobId) {
        return adminService.deleteJob(jobId);
    }
}
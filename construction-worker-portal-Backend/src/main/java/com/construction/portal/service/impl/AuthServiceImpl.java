package com.construction.portal.service.impl;

import java.util.HashMap;
import java.util.Map;

import com.construction.portal.entity.ContractorProfile;
import com.construction.portal.entity.Role;
import com.construction.portal.entity.WorkerProfile;
import org.springframework.stereotype.Service;

import com.construction.portal.repository.WorkerRepository;
import com.construction.portal.repository.ContractorRepository;

import com.construction.portal.dto.LoginRequest;
import com.construction.portal.dto.OtpVerificationRequest;
import com.construction.portal.dto.RegisterRequest;
import com.construction.portal.entity.User;
import com.construction.portal.repository.UserRepository;
import com.construction.portal.service.AuthService;


@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final WorkerRepository workerRepository;
    private final ContractorRepository contractorRepository;

    private final Map<String, String> otpStore = new HashMap<>();

    public AuthServiceImpl(UserRepository userRepository,
                           WorkerRepository workerRepository,
                           ContractorRepository contractorRepository) {

        this.userRepository = userRepository;
        this.workerRepository = workerRepository;
        this.contractorRepository = contractorRepository;
    }

    @Override
    public String register(RegisterRequest request) {

        if (userRepository.existsByMobileNumber(request.getMobileNumber())) {
            return "Mobile number already registered";
        }

        User user = new User();
        user.setMobileNumber(request.getMobileNumber());
        user.setRole(request.getRole());

        // Save user first
        User savedUser = userRepository.save(user);

        // Create profile based on role
        if (savedUser.getRole() == Role.WORKER) {

            WorkerProfile worker = new WorkerProfile();
            worker.setUser(savedUser);

            // Default values
            worker.setWorkerName("");
            worker.setAge(0);
            worker.setGender("");
            worker.setAddress("");
            worker.setVillage("");
            worker.setDistrict("");
            worker.setSkill("");
            worker.setExperienceYears(0);
            worker.setCurrentLocation("");

            workerRepository.save(worker);

        } else if (savedUser.getRole() == Role.CONTRACTOR) {

            ContractorProfile contractor = new ContractorProfile();
            contractor.setUser(savedUser);

            contractor.setContractorName("");
            contractor.setAddress("");
            contractor.setVillage("");
            contractor.setDistrict("");
            contractor.setExperienceYears(0);
            contractor.setCompletedProjects(0);
            contractor.setPreviousWorkDetails("");

            contractorRepository.save(contractor);
        }

        return "Registration Successful";
    }

    @Override
    public String sendOtp(LoginRequest request) {

        if (!userRepository.existsByMobileNumber(request.getMobileNumber())) {
            return "User not found";
        }

        // Dummy OTP for project
        String otp = "123456";

        otpStore.put(request.getMobileNumber(), otp);

        return "OTP Sent Successfully : " + otp;
    }

    @Override
    public com.construction.portal.dto.LoginResponse verifyOtp(OtpVerificationRequest request) {

        String storedOtp = otpStore.get(request.getMobileNumber());

        if (storedOtp == null) {
            throw new RuntimeException("OTP Expired");
        }

        if (!storedOtp.equals(request.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }

        otpStore.remove(request.getMobileNumber());

        User user = userRepository.findByMobileNumber(request.getMobileNumber())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new com.construction.portal.dto.LoginResponse(
                Long.valueOf(user.getUserId()),
                user.getRole().name(),
                "Login Successful"
        );
    }
}
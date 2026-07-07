package com.construction.portal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.construction.portal.entity.JobApplication;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Integer> {

    List<JobApplication> findByWorkerWorkerId(Integer workerId);

    List<JobApplication> findByJobJobId(Integer jobId);

    boolean existsByJobJobIdAndWorkerWorkerId(Integer jobId, Integer workerId);

}
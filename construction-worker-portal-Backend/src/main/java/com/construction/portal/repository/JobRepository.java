package com.construction.portal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.construction.portal.entity.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {

    List<Job> findByContractorContractorId(Integer contractorId);

    List<Job> findByStatus(com.construction.portal.entity.JobStatus status);

}
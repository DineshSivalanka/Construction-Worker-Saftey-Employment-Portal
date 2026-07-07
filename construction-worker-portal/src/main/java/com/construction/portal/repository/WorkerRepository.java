package com.construction.portal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.construction.portal.entity.WorkerProfile;

@Repository
public interface WorkerRepository extends JpaRepository<WorkerProfile, Integer> {

    Optional<WorkerProfile> findByUserUserId(Integer userId);

}
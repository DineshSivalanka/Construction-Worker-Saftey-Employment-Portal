package com.construction.portal.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.construction.portal.entity.ContractorProfile;

@Repository
public interface ContractorRepository extends JpaRepository<ContractorProfile, Integer> {

    Optional<ContractorProfile> findByUserUserId(Integer userId);

}
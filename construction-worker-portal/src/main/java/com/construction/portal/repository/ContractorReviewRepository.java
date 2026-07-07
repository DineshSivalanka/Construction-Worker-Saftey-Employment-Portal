package com.construction.portal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.construction.portal.entity.ContractorReview;

@Repository
public interface ContractorReviewRepository extends JpaRepository<ContractorReview, Integer> {

    List<ContractorReview> findByContractorContractorId(Integer contractorId);

}
package com.construction.portal.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "contractor_reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContractorReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Integer reviewId;

    @ManyToOne
    @JoinColumn(name = "contractor_id", nullable = false)
    private ContractorProfile contractor;

    @Column(name = "reviewer_name", nullable = false)
    private String reviewerName;

    @Column(nullable = false)
    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String review;
}
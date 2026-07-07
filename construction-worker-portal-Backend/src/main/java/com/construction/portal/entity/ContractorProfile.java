package com.construction.portal.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "contractor_profile")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContractorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contractor_id")
    private Integer contractorId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "contractor_name", nullable = false)
    private String contractorName;

    @Column(columnDefinition = "TEXT")
    private String address;

    private String village;

    private String district;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Column(name = "completed_projects")
    private Integer completedProjects;

    @Column(columnDefinition = "TEXT")
    private String previousWorkDetails;

    @OneToMany(mappedBy = "contractor", cascade = CascadeType.ALL)
    private List<Job> jobs;

    @OneToMany(mappedBy = "contractor", cascade = CascadeType.ALL)
    private List<ContractorReview> reviews;
}
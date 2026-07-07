package com.construction.portal.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id")
    private Integer jobId;

    @ManyToOne
    @JoinColumn(name = "contractor_id", nullable = false)
    private ContractorProfile contractor;

    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;

    @Column(name = "working_hours")
    private String workingHours;

    private BigDecimal salary;

    @Column(name = "workers_required")
    private Integer workersRequired;

    @Column(name = "experience_required")
    private Integer experienceRequired;

    @Enumerated(EnumType.STRING)
    private JobStatus status;

    @Column(name = "posted_date")
    private LocalDateTime postedDate;

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<JobApplication> applications;

    @PrePersist
    public void prePersist() {
        this.postedDate = LocalDateTime.now();

        if (this.status == null) {
            this.status = JobStatus.OPEN;
        }
    }
}
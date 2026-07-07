package com.construction.portal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "worker_profile")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "worker_id")
    private Integer workerId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "worker_name", nullable = false)
    private String workerName;

    private Integer age;

    private String gender;

    @Column(columnDefinition = "TEXT")
    private String address;

    private String village;

    private String district;

    private String skill;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Column(name = "current_location")
    private String currentLocation;

    @OneToMany(mappedBy = "worker", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<JobApplication> applications;
}

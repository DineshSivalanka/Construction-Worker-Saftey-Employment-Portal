package com.construction.portal.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class WorkerDTO {

    @NotBlank(message = "Worker name is required")
    private String workerName;

    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Minimum age is 18")
    @Max(value = 70, message = "Maximum age is 70")
    private Integer age;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Village is required")
    private String village;

    @NotBlank(message = "District is required")
    private String district;

    @NotBlank(message = "Skill is required")
    private String skill;

    @NotNull(message = "Experience is required")
    @Min(value = 0)
    @Max(value = 50)
    private Integer experienceYears;

    @NotBlank(message = "Current location is required")
    private String currentLocation;
}
package com.construction.portal.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ContractorDTO {

    @NotBlank(message = "Contractor name is required")
    private String contractorName;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Village is required")
    private String village;

    @NotBlank(message = "District is required")
    private String district;

    @NotNull(message = "Experience is required")
    @Min(0)
    private Integer experienceYears;

    @NotNull(message = "Completed projects is required")
    @Min(0)
    private Integer completedProjects;

    @NotBlank(message = "Previous work details are required")
    private String previousWorkDetails;
}
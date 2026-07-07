package com.construction.portal.dto;

import lombok.Data;

@Data
public class ContractorDTO {

    private String contractorName;
    private String address;
    private String village;
    private String district;
    private Integer experienceYears;
    private Integer completedProjects;
    private String previousWorkDetails;

}
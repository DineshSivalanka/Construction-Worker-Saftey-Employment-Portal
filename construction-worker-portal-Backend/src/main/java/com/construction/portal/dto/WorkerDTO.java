package com.construction.portal.dto;

import lombok.Data;

@Data
public class WorkerDTO {

    private String workerName;
    private Integer age;
    private String gender;
    private String address;
    private String village;
    private String district;
    private String skill;
    private Integer experienceYears;
    private String currentLocation;

}
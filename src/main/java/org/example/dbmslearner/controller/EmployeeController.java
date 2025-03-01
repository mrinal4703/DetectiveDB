package org.example.dbmslearner.controller;

import org.example.dbmslearner.entity.EmployeeEntity;
import org.example.dbmslearner.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/employeesdata")
    public List<EmployeeEntity> getAllEmployees() {
        return employeeRepository.findAll();
    }
}
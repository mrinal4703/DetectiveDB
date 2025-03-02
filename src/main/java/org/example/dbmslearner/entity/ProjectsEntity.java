package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="projects")
public class ProjectsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer project_id;
    private String project_name;
    private String department;

    public ProjectsEntity() {
    }

    public ProjectsEntity(Integer id, Integer project_id, String project_name, String department, String start_date, String end_date, Integer budget) {
        this.id = id;
        this.project_id = project_id;
        this.project_name = project_name;
        this.department = department;
        this.start_date = start_date;
        this.end_date = end_date;
        this.budget = budget;
    }

    private String start_date;
    private String end_date;
    private Integer budget;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getProject_id() {
        return project_id;
    }

    public void setProject_id(Integer project_id) {
        this.project_id = project_id;
    }

    public String getProject_name() {
        return project_name;
    }

    public void setProject_name(String project_name) {
        this.project_name = project_name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public Integer getBudget() {
        return budget;
    }

    public void setBudget(Integer budget) {
        this.budget = budget;
    }
}

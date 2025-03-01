package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="employees")
public class EmployeeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer employee_id;
    private String first_name;
    private String last_name;
    private String department;
    private String position;
    private Integer salary;
    private Integer age;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getEmployee_id() {
        return employee_id;
    }

    public void setEmployee_id(Integer employee_id) {
        this.employee_id = employee_id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Integer getSalary() {
        return salary;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getJoining_date() {
        return joining_date;
    }

    public void setJoining_date(String joining_date) {
        this.joining_date = joining_date;
    }

    public Integer getPerformance_rating() {
        return performance_rating;
    }

    public void setPerformance_rating(Integer performance_rating) {
        this.performance_rating = performance_rating;
    }

    public String getActive() {
        return active;
    }

    public void setActive(String active) {
        this.active = active;
    }

    private String joining_date;
    private Integer performance_rating;
    private String active;

    public EmployeeEntity(Integer id, Integer employee_id, String first_name, String last_name, String department, String position, Integer salary, Integer age, String joining_date, Integer performance_rating, String active) {
        this.id = id;
        this.employee_id = employee_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.department = department;
        this.position = position;
        this.salary = salary;
        this.age = age;
        this.joining_date = joining_date;
        this.performance_rating = performance_rating;
        this.active = active;
    }

    public EmployeeEntity() {
    }
}

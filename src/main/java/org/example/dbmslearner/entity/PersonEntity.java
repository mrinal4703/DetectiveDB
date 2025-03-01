package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="persons")
public class PersonEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    private String personName;
    private String location;
    private String action;

    public PersonEntity(Integer id, String personName, String location, String action) {
        this.id = id;
        this.personName = personName;
        this.location = location;
        this.action = action;
    }

    public PersonEntity() {
    }
}

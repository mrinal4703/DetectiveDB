package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="witness_reports")
public class WitnessReportsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String last_location;

    public Integer getId() {
        return id;
    }

    public WitnessReportsEntity() {
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLast_location() {
        return last_location;
    }

    public void setLast_location(String last_location) {
        this.last_location = last_location;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getWitness_statement() {
        return witness_statement;
    }

    public void setWitness_statement(String witness_statement) {
        this.witness_statement = witness_statement;
    }

    private String time;
    private String witness_statement;

    public WitnessReportsEntity(Integer id, String last_location, String time, String witness_statement) {
        this.id = id;
        this.last_location = last_location;
        this.time = time;
        this.witness_statement = witness_statement;
    }

}

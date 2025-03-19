package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="evidence")
public class EvidenceEntity {
    public EvidenceEntity(Integer id, String location, String witness_statement, String camera_footage) {
        this.id = id;
        this.location = location;
        this.witness_statement = witness_statement;
        this.camera_footage = camera_footage;
    }

    public EvidenceEntity() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String location, witness_statement, camera_footage;

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

    public String getWitness_statement() {
        return witness_statement;
    }

    public void setWitness_statement(String witness_statement) {
        this.witness_statement = witness_statement;
    }

    public String getCamera_footage() {
        return camera_footage;
    }

    public void setCamera_footage(String camera_footage) {
        this.camera_footage = camera_footage;
    }
}

package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="criminal_history")
public class CriminalHistoryEntity {
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSuspect_name() {
        return suspect_name;
    }

    public void setSuspect_name(String suspect_name) {
        this.suspect_name = suspect_name;
    }

    public String getKnown_associate() {
        return known_associate;
    }

    public void setKnown_associate(String known_associate) {
        this.known_associate = known_associate;
    }

    public String getCriminal_record() {
        return criminal_record;
    }

    public void setCriminal_record(String criminal_record) {
        this.criminal_record = criminal_record;
    }

    public CriminalHistoryEntity() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String suspect_name;

    public CriminalHistoryEntity(Integer id, String suspect_name, String known_associate, String criminal_record) {
        this.id = id;
        this.suspect_name = suspect_name;
        this.known_associate = known_associate;
        this.criminal_record = criminal_record;
    }

    private String known_associate;
    private String criminal_record;
}

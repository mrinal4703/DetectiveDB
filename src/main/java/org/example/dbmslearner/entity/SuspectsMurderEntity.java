package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="suspects_murder")
public class SuspectsMurderEntity {
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getSuspect_name() {
        return suspect_name;
    }

    public void setSuspect_name(String suspect_name) {
        this.suspect_name = suspect_name;
    }

    public SuspectsMurderEntity() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String time;

    public SuspectsMurderEntity(Integer id, String time, String suspect_name) {
        this.id = id;
        this.time = time;
        this.suspect_name = suspect_name;
    }

    private String suspect_name;
}

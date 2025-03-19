package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="incident_info")
public class IncidentInfoEntity {
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getParking_lot() {
        return parking_lot;
    }

    public void setParking_lot(String parking_lot) {
        this.parking_lot = parking_lot;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDamaged_part() {
        return damaged_part;
    }

    public IncidentInfoEntity() {
    }

    public void setDamaged_part(String damaged_part) {
        this.damaged_part = damaged_part;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String parking_lot;
    private String time;

    public IncidentInfoEntity(Integer id, String parking_lot, String time, String damaged_part) {
        this.id = id;
        this.parking_lot = parking_lot;
        this.time = time;
        this.damaged_part = damaged_part;
    }

    private String damaged_part;
}

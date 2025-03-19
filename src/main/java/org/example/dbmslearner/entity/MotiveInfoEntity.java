package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="motive_info")
public class MotiveInfoEntity {
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

    public String getMotive() {
        return motive;
    }

    public void setMotive(String motive) {
        this.motive = motive;
    }

    public MotiveInfoEntity() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public MotiveInfoEntity(Integer id, String suspect_name, String motive) {
        this.id = id;
        this.suspect_name = suspect_name;
        this.motive = motive;
    }

    private String suspect_name, motive;
}

package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="suspect_alibi")
public class SuspectAlibiEntity {
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

    public String getAlibi() {
        return alibi;
    }

    public SuspectAlibiEntity() {
    }

    public void setAlibi(String alibi) {
        this.alibi = alibi;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public SuspectAlibiEntity(Integer id, String suspect_name, String alibi) {
        this.id = id;
        this.suspect_name = suspect_name;
        this.alibi = alibi;
    }

    private String suspect_name, alibi;
}

package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="crime_scene")
public class CrimeSceneEntity {
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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getWeapon() {
        return weapon;
    }

    public void setWeapon(String weapon) {
        this.weapon = weapon;
    }

    public CrimeSceneEntity() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String location;

    public CrimeSceneEntity(Integer id, String location, String time, String weapon) {
        this.id = id;
        this.location = location;
        this.time = time;
        this.weapon = weapon;
    }

    private String time;
    private String weapon;
}

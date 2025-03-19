package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="weapon_analysis")
public class WeaponAnalysisEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public WeaponAnalysisEntity(Integer id, String weapon, String cause_of_death) {
        this.id = id;
        this.weapon = weapon;
        this.cause_of_death = cause_of_death;
    }

    public WeaponAnalysisEntity() {
    }

    private String weapon, cause_of_death;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getWeapon() {
        return weapon;
    }

    public void setWeapon(String weapon) {
        this.weapon = weapon;
    }

    public String getCause_of_death() {
        return cause_of_death;
    }

    public void setCause_of_death(String cause_of_death) {
        this.cause_of_death = cause_of_death;
    }

}

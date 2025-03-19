package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="damage_type")
public class DamageTypeEntity {
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDamaged_part() {
        return damaged_part;
    }

    public void setDamaged_part(String damaged_part) {
        this.damaged_part = damaged_part;
    }

    public String getDamage_type() {
        return damage_type;
    }

    public void setDamage_type(String damage_type) {
        this.damage_type = damage_type;
    }

    public DamageTypeEntity() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public DamageTypeEntity(Integer id, String damaged_part, String damage_type) {
        this.id = id;
        this.damaged_part = damaged_part;
        this.damage_type = damage_type;
    }

    private String damaged_part, damage_type;
}

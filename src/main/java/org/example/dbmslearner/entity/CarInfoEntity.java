package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="car_info")
public class CarInfoEntity {
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

    public String getCar_owner() {
        return car_owner;
    }

    public void setCar_owner(String car_owner) {
        this.car_owner = car_owner;
    }

    public String getCar_model() {
        return car_model;
    }

    public void setCar_model(String car_model) {
        this.car_model = car_model;
    }

    public CarInfoEntity() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String parking_lot;

    public CarInfoEntity(Integer id, String parking_lot, String car_owner, String car_model) {
        this.id = id;
        this.parking_lot = parking_lot;
        this.car_owner = car_owner;
        this.car_model = car_model;
    }

    private String car_owner;
    private String car_model;
}

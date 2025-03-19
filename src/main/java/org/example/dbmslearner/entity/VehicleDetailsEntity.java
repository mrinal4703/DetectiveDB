package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="vehicle_details")
public class VehicleDetailsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String vehicle_spotted, vehicle_owner, vehicle_type;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getVehicle_spotted() {
        return vehicle_spotted;
    }

    public void setVehicle_spotted(String vehicle_spotted) {
        this.vehicle_spotted = vehicle_spotted;
    }

    public String getVehicle_owner() {
        return vehicle_owner;
    }

    public void setVehicle_owner(String vehicle_owner) {
        this.vehicle_owner = vehicle_owner;
    }

    public String getVehicle_type() {
        return vehicle_type;
    }

    public void setVehicle_type(String vehicle_type) {
        this.vehicle_type = vehicle_type;
    }


    public VehicleDetailsEntity() {
    }

    public VehicleDetailsEntity(Integer id, String vehicle_spotted, String vehicle_owner, String vehicle_type) {
        this.id = id;
        this.vehicle_spotted = vehicle_spotted;
        this.vehicle_owner = vehicle_owner;
        this.vehicle_type = vehicle_type;
    }
}

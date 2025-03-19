package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="vehicle_sightings")
public class VehicleSightingsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String last_location;

    public VehicleSightingsEntity() {
    }

    public VehicleSightingsEntity(Integer id, String last_location, String vehicle_spotted, String license_plate) {
        this.id = id;
        this.last_location = last_location;
        this.vehicle_spotted = vehicle_spotted;
        this.license_plate = license_plate;
    }

    private String vehicle_spotted;
    private String license_plate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLast_location() {
        return last_location;
    }

    public void setLast_location(String last_location) {
        this.last_location = last_location;
    }

    public String getVehicle_spotted() {
        return vehicle_spotted;
    }

    public void setVehicle_spotted(String vehicle_spotted) {
        this.vehicle_spotted = vehicle_spotted;
    }

    public String getLicense_plate() {
        return license_plate;
    }

    public void setLicense_plate(String license_plate) {
        this.license_plate = license_plate;
    }

}

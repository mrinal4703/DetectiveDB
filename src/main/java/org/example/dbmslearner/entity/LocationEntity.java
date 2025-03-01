package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="locations")
public class LocationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public LocationEntity(Integer id, String location, String cameraId) {
        this.id = id;
        this.location = location;
        this.cameraId = cameraId;
    }

    public LocationEntity() {
    }

    private String location;
    private String cameraId;

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

    public String getCameraId() {
        return cameraId;
    }

    public void setCameraId(String cameraId) {
        this.cameraId = cameraId;
    }

}

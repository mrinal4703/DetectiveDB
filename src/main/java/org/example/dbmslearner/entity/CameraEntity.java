package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="camera")
public class CameraEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public CameraEntity() {
    }

    public CameraEntity(Integer id, String cameraId, String status, String footage) {
        this.id = id;
        this.cameraId = cameraId;
        this.status = status;
        this.footage = footage;
    }

    private String cameraId;
    private String status;
    private String footage;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCameraId() {
        return cameraId;
    }

    public void setCameraId(String cameraId) {
        this.cameraId = cameraId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getFootage() {
        return footage;
    }

    public void setFootage(String footage) {
        this.footage = footage;
    }

}

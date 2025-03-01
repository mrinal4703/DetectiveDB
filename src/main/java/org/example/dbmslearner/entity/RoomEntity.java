package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="personrooms")
public class RoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public RoomEntity() {
    }

    private String personName;

    public RoomEntity(Integer id, String personName, String roomType, String roomContents) {
        this.id = id;
        this.personName = personName;
        this.roomType = roomType;
        this.roomContents = roomContents;
    }

    private String roomType;
    private String roomContents;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public String getRoomContents() {
        return roomContents;
    }

    public void setRoomContents(String roomContents) {
        this.roomContents = roomContents;
    }

}

package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="witnessstatements")
public class WitnessStatementEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String roomType;

    public WitnessStatementEntity() {
    }

    public WitnessStatementEntity(Integer id, String roomType, String time, String statement) {
        this.id = id;
        this.roomType = roomType;
        this.time = time;
        this.statement = statement;
    }

    private String time;
    private String statement;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getStatement() {
        return statement;
    }

    public void setStatement(String statement) {
        this.statement = statement;
    }

}

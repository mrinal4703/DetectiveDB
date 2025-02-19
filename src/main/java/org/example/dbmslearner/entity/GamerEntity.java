package org.example.dbmslearner.entity;

import jakarta.persistence.*;

@Entity
@Table(name="gamers")
public class GamerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    public GamerEntity() {
    }

    public GamerEntity(Boolean basicGame1, Boolean basicGame2, Boolean basicTutorial, String email, Integer id, String password, Float progress, String lastsaved) {
        this.basicGame1 = basicGame1;
        this.basicGame2 = basicGame2;
        this.basicTutorial = basicTutorial;
        this.email = email;
        this.id = id;
        this.password = password;
        this.progress = progress;
        this.lastsaved = lastsaved;
    }

    @Column(unique = true)
    private String email;

    private String password;
    private Boolean basicTutorial;
    private Boolean basicGame2;
    private Boolean basicGame1;
    private Float progress;
    private String lastsaved;

    public String getLastsaved() {
        return lastsaved;
    }

    public void setLastsaved(String lastsaved) {
        this.lastsaved = lastsaved;
    }

    public Boolean getBasicGame1() {
        return basicGame1;
    }

    public void setBasicGame1(Boolean basicGame1) {
        this.basicGame1 = basicGame1;
    }

    public Boolean getBasicGame2() {
        return basicGame2;
    }

    public void setBasicGame2(Boolean basicGame2) {
        this.basicGame2 = basicGame2;
    }

    public Boolean getBasicTutorial() {
        return basicTutorial;
    }

    public void setBasicTutorial(Boolean basicTutorial) {
        this.basicTutorial = basicTutorial;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Float getProgress() {
        return progress;
    }

    public void setProgress(Float progress) {
        this.progress = progress;
    }
}

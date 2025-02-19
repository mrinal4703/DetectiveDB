package org.example.dbmslearner.repository;


import org.example.dbmslearner.entity.GamerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GamerRepository extends JpaRepository<GamerEntity, Integer> {
    GamerEntity findByEmail(String email);
}

package org.example.dbmslearner.repository;

import org.example.dbmslearner.entity.ProjectsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectsRepository extends JpaRepository<ProjectsEntity, Integer> {
}

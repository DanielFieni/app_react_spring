package com.danielProject.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.danielProject.demo.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{

	
}

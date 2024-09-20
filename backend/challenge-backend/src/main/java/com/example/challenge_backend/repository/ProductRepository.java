package com.example.challenge_backend.repository;

import com.example.challenge_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/*
* Essa interface é responsável por fazer a comunicação com o banco de dados, ela extende a interface JpaRepository
 */
@Repository
public interface ProductRepository  extends JpaRepository<Product, Long> {
    List<Product> findByNameContaining(String name);
    Optional<Product> findById(Long id);

}

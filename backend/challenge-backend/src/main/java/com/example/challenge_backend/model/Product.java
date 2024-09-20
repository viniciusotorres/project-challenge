package com.example.challenge_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Representa um produto.
 * A classe Product  é uma entidade que representa um produto. Ela possui os atributos id, name, price, description e image.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    /**
     * O id do produto.
     * O id do produto é gerado automaticamente e é a chave primária da entidade.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * O nome do produto.
     * O nome do produto não pode ser vazio e deve ter no máximo 100 caracteres.
     */
    @Size(max = 100, message = "Name cannot be longer than 100 characters")
    @NotBlank(message = "Name cannot be empty")
    private String name;

    /**
     * O preço do produto.
     * O preço do produto não pode ser vazio e deve ser maior ou igual a zero.
     */
    @NotNull(message = "Price cannot be null")
    @Min(value = 0, message = "Price cannot be negative")
    private BigDecimal price;

    /**
     * A descrição do produto.
     * A descrição do produto não pode ser vazia e deve ter no máximo 400 caracteres.
     */
    @Size(max = 400, message = "Description cannot be longer than 400 characters")
    @NotBlank(message = "Description cannot be empty")
    private String description;

    /**
     * A URL da imagem do produto.
     * A URL da imagem do produto deve ser válida.
     */
    @Pattern(regexp = "^(http|https)://.*$", message = "Image must be a valid URL")
    private String image;

}

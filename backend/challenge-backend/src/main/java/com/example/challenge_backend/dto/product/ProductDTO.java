package com.example.challenge_backend.dto.product;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
/*
* Representa um produto.
* A classe ProductDTO é um DTO que representa um produto. Ela possui os atributos id, name, price, description e image.
 */
public record ProductDTO(
        /**
         * O id do produto.
         * O id do produto não pode ser nulo.
         */
        Long id,

        /**
         * O nome do produto.
         * O nome do produto não pode ser vazio e deve ter no máximo 100 caracteres.
         */
        @NotBlank(message = "Name cannot be empty")
        @Size(max = 100, message = "Name cannot be longer than 100 characters")
        String name,

        /**
         * O preço do produto.
         * O preço do produto não pode ser nulo e deve ser maior ou igual a zero.
         */
        @NotNull(message = "Price cannot be null")
        @Min(value = 0, message = "Price cannot be negative")
        @Max(value = 10000, message = "Price cannot be greater than 10000")
        BigDecimal price,

        /**
         * A descrição do produto.
         * A descrição do produto não pode ser vazia e deve ter no máximo 400 caracteres.
         */
        @NotBlank(message = "Description cannot be empty")
        @Size(max = 400, message = "Description cannot be longer than 400 characters")
        String description,

        /**
         * O nome do arquivo da imagem do produto.
         * O nome do arquivo da imagem do produto não pode ser vazio.
         */
        @NotNull(message = "Image cannot be empty")
        byte[] image
) {}

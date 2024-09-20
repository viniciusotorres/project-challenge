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
        @NotNull(message = "ID cannot be null")
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
        BigDecimal price,

        /**
         * A descrição do produto.
         * A descrição do produto não pode ser vazia e deve ter no máximo 400 caracteres.
         */
        @NotBlank(message = "Description cannot be empty")
        @Size(max = 400, message = "Description cannot be longer than 400 characters")
        String description,

        /**
         * A URL da imagem do produto.
         * A URL da imagem do produto deve ser válida.
         */
        @Pattern(regexp = "^(http|https)://.*$", message = "Image must be a valid URL")
        String image
) {}

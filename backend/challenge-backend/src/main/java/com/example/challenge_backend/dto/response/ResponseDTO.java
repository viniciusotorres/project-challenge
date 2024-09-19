package com.example.challenge_backend.dto.response;

import com.example.challenge_backend.dto.product.ProductDTO;

import java.util.List;

public record ResponseDTO(List<ProductDTO> products, String message) {
}

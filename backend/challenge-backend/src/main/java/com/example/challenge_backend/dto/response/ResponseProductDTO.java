package com.example.challenge_backend.dto.response;

import com.example.challenge_backend.dto.product.ProductDTO;

public record ResponseProductDTO(ProductDTO product, String message) {
}

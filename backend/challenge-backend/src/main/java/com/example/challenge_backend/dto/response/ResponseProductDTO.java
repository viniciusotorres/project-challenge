package com.example.challenge_backend.dto.response;

import com.example.challenge_backend.dto.product.ProductDTO;

/**
 * Resposta com o produto e uma mensagem.
 * Esta classe representa a resposta de uma requisição que envolve um produto.
 */
public record ResponseProductDTO(ProductDTO product, String message) {
}

package com.example.challenge_backend.dto.error;

/*
 * DTO para detalhes de erro.
 * Este DTO é utilizado para encapsular os detalhes de um erro ocorrido na aplicação.
 */
public record ErrorDetails(int statusCode, String message, String details) {
}

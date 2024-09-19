package com.example.challenge_backend.dto.error;

public record ErrorDetails(int statusCode, String message, String details) {
}

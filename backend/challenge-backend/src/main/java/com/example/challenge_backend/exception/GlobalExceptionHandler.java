    package com.example.challenge_backend.exception;

    import com.example.challenge_backend.dto.error.ErrorDetails;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.validation.FieldError;
    import org.springframework.web.bind.MethodArgumentNotValidException;
    import org.springframework.web.bind.annotation.ControllerAdvice;
    import org.springframework.web.bind.annotation.ExceptionHandler;
    import org.springframework.web.context.request.WebRequest;

    import java.util.HashMap;
    import java.util.Map;

    /*
     * Essa classe é responsável por tratar as exceções lançadas pela aplicação.
     * Ela é anotada com @ControllerAdvice, que é uma especialização de @Component, o que faz com que o Spring a reconheça como um bean.
     */
    @ControllerAdvice
    public class GlobalExceptionHandler {

        /*
         * O Logger é uma interface que fornece métodos para registrar mensagens de log.
         */
        private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

        /*
         * O método handleResourceNotFoundException é responsável por tratar a exceção ResourceNotFoundException.
         */
        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
            logger.error("Resource not found: {}", ex.getMessage());
            ErrorDetails errorDetails = new ErrorDetails(HttpStatus.NOT_FOUND.value(), ex.getMessage(), request.getDescription(false));
            return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
        }

        /*
         * O método handleValidationExceptions é responsável por tratar a exceção MethodArgumentNotValidException.
         * Essa exceção é lançada quando um argumento anotado com @Valid falha na validação.
         */
        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex, WebRequest request) {
            Map<String, String> errors = new HashMap<>();
            ex.getBindingResult().getAllErrors().forEach((error) -> {
                String fieldName = ((FieldError) error).getField();
                String errorMessage = error.getDefaultMessage();
                errors.put(fieldName, errorMessage);
            });

            logger.error("Validation errors: {}", errors);
            return ResponseEntity.badRequest().body(errors);
        }

        /*
         * O método handleGlobalException é responsável por tratar qualquer outra exceção que não seja a ResourceNotFoundException.
         */
        @ExceptionHandler(Exception.class)
        public ResponseEntity<?> handleGenericException (Exception ex, WebRequest request) {
            logger.error("An error occurred: {}", ex.getMessage());
            ErrorDetails errorDetails = new ErrorDetails(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage(), request.getDescription(false));
            return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


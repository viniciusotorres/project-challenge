package com.example.challenge_backend.controller;

import com.example.challenge_backend.dto.product.ProductDTO;
import com.example.challenge_backend.dto.response.ResponseDTO;
import com.example.challenge_backend.dto.response.ResponseProductDTO;
import com.example.challenge_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/products")
    public ResponseEntity<ProductDTO> create(@RequestBody ProductDTO productDTO) {

        ProductDTO createdProduct = productService.create(productDTO);

        URI location = URI.create("/api/products/" + createdProduct.id());
        return ResponseEntity.created(location).body(createdProduct);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDTO> findById(@PathVariable Long id) {
        ProductDTO product = productService.findById(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/products")
    public ResponseEntity<Page<ProductDTO>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort) {
        Page<ProductDTO> products = productService.findAll(page, size, sort);
        return ResponseEntity.ok(products);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<ResponseProductDTO> update(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        ProductDTO updatedProduct = productService.update(id, productDTO);
        return ResponseEntity.ok(new ResponseProductDTO(updatedProduct, "Produto atualizado com sucesso"));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<ProductDTO>> search(@RequestParam String p) {
        List<ProductDTO> products = productService.search(p);
        return ResponseEntity.ok(products);
    }
}

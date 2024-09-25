package com.example.challenge_backend.controller;

import com.example.challenge_backend.dto.product.ProductDTO;
import com.example.challenge_backend.dto.response.ResponseProductDTO;
import com.example.challenge_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.URI;
import java.util.Arrays;
import java.util.List;

/**
 * Controlador responsável pela gestão dos produtos.
 * Este controlador lida com as requisições relacionadas a produtos,
 * incluindo operações de criação, leitura, atualização e exclusão.
 */
@RestController
@RequestMapping("/api")
@Validated
public class ProductController {

    @Autowired
    private ProductService productService;

    /**
     * Cria um novo produto.
     *
     * @param name        o nome do produto
     * @param price       o preço do produto
     * @param description a descrição do produto
     * @param image       a imagem do produto
     * @return resposta com o produto criado e sua URI
     */
    @PostMapping("/products")
    public ResponseEntity<ProductDTO> create(
            @RequestParam("name") String name,
            @RequestParam("price") BigDecimal price,
            @RequestParam("description") String description,
            @RequestParam("image") MultipartFile image) throws IOException {

        ProductDTO productDTO = convertToProductDTO(name, price, description, image);
        ProductDTO createdProduct = productService.create(productDTO, image);
        URI location = URI.create("/api/products/" + createdProduct.id());
        return ResponseEntity.created(location).body(createdProduct);
    }

    /**
     * Busca um produto pelo ID.
     *
     * @param id o ID do produto
     * @return resposta com o produto encontrado
     */
    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDTO> findById(@PathVariable Long id) {
        ProductDTO product = productService.findById(id);
        return ResponseEntity.ok(product);
    }

    /**
     * Busca todos os produtos com paginação e ordenação.
     *
     * @param page o número da página
     * @param size o número de itens por página
     * @param sort o critério de ordenação
     * @return resposta com a lista de produtos
     */
    @GetMapping("/products")
    public ResponseEntity<Page<ProductDTO>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sort) {
        Page<ProductDTO> products = productService.findAll(page, size, sort);
        return ResponseEntity.ok(products);
    }

    /**
     * Atualiza um produto existente.
     *
     * @param id         o ID do produto a ser atualizado
     * @return resposta com o produto atualizado e mensagem de sucesso
     */
    @PutMapping("/products/{id}")
    public ResponseEntity<ResponseProductDTO> update(
            @PathVariable("id") Long id,
            @RequestParam("name") String name,
            @RequestParam("price") BigDecimal price,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        ProductDTO existingProduct = productService.findById(id);
        byte[] imageBytes = existingProduct.image();

        if (image != null && !Arrays.equals(image.getBytes(), imageBytes)) {
            imageBytes = image.getBytes();
        }

        ProductDTO productDTO = new ProductDTO(id, name, price, description, imageBytes);
        ProductDTO updatedProduct = productService.update(id, productDTO, image);
        return ResponseEntity.ok(new ResponseProductDTO(updatedProduct, "Produto atualizado com sucesso"));
    }
    /**
     * Deleta um produto pelo ID.
     *
     * @param id o ID do produto a ser deletado
     * @return resposta sem conteúdo, indicando sucesso na exclusão
     */
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Busca produtos pelo nome.
     *
     * @param query a string de pesquisa
     * @return resposta com a lista de produtos que correspondem à pesquisa
     */
    @GetMapping("/products/search")
    public ResponseEntity<List<ProductDTO>> search(@RequestParam String query) {
        List<ProductDTO> products = productService.search(query);
        return ResponseEntity.ok(products);
    }

    private ProductDTO convertToProductDTO(String name, BigDecimal price, String description, MultipartFile image) throws IOException {
        return new ProductDTO(
                null,
                name,
                price,
                description,
                image.getBytes()
        );
    }
}
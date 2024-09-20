package com.example.challenge_backend.controller;

import com.example.challenge_backend.dto.product.ProductDTO;
import com.example.challenge_backend.dto.response.ResponseProductDTO;
import com.example.challenge_backend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

/**
 * Controller responsável pela gestão dos produtos.
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
     * @param productDTO objeto com os dados do produto a ser criado
     * @return resposta com o produto criado e sua URI
     */
    @PostMapping("/products")
    public ResponseEntity<ProductDTO> create(@Valid @RequestBody ProductDTO productDTO) {
        ProductDTO createdProduct = productService.create(productDTO);
        URI location = URI.create("/api/products/" + createdProduct.id());
        return ResponseEntity.created(location).body(createdProduct);
    }

    /**
     * Busca um produto pelo ID.
     *
     * @param id ID do produto
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
     * @param page número da página
     * @param size número de itens por página
     * @param sort critério de ordenação
     * @return resposta com a lista de produtos
     */
    @GetMapping("/products")
    public ResponseEntity<Page<ProductDTO>> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sort) {
        Page<ProductDTO> products = productService.findAll(page, size, sort);
        return ResponseEntity.ok(products);
    }

    /**
     * Atualiza um produto existente.
     *
     * @param id ID do produto a ser atualizado
     * @param productDTO dados do produto atualizados
     * @return resposta com o produto atualizado e mensagem de sucesso
     */
    @PutMapping("/products/{id}")
    public ResponseEntity<ResponseProductDTO> update(@PathVariable Long id, @Valid @RequestBody ProductDTO productDTO) {
        ProductDTO updatedProduct = productService.update(id, productDTO);
        return ResponseEntity.ok(new ResponseProductDTO(updatedProduct, "Produto atualizado com sucesso"));
    }

    /**
     * Deleta um produto pelo ID.
     *
     * @param id ID do produto a ser deletado
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
     * @param query string de pesquisa
     * @return resposta com a lista de produtos que correspondem à pesquisa
     */
    @GetMapping("/products/search")
    public ResponseEntity<List<ProductDTO>> search(@RequestParam String query) {
        List<ProductDTO> products = productService.search(query);
        return ResponseEntity.ok(products);
    }
}

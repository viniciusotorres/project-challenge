package com.example.challenge_backend.service;

import com.example.challenge_backend.dto.product.ProductDTO;
import com.example.challenge_backend.exception.ResourceNotFoundException;
import com.example.challenge_backend.model.Product;
import com.example.challenge_backend.repository.ProductRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.stream.Collectors;
/*
* O serviço é responsável por realizar a lógica de negócio da aplicação.
* Ele é responsável por realizar a comunicação entre o controlador e o repositório.
* O serviço é responsável por realizar a validação dos dados, tratamento de exceções e regras de negócio.
 */
@Service
public class ProductService {

    /*
        * O logger é utilizado para registrar informações, avisos e erros.
        * Ele é útil para rastrear o comportamento da aplicação e depurar problemas.
     */
    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);

    /*
        * O repositório é utilizado para realizar operações de persistência no banco de dados.
     */
    @Autowired
    private ProductRepository productRepository;

    /*
     * Este método cria um novo produto com base nos dados fornecidos.
     * A validação é feita para garantir que os dados estão corretos antes de
     * persistir no banco de dados, minimizando erros de entrada. O uso de
     * ProductDTO facilita a transferência de dados entre camadas e mantém
     * a lógica de negócios separada da lógica de apresentação.
     */
    @Transactional
    public ProductDTO create(@Valid ProductDTO productDTO) {
        try {
            Product product = new Product();
            product.setName(productDTO.name());
            product.setPrice(productDTO.price());
            product.setDescription(productDTO.description());
            product.setImage(productDTO.image());

            Product savedProduct = productRepository.save(product);
            logger.info("Product created with ID: {}", savedProduct.getId());
            return mapToDTO(savedProduct);
        } catch (Exception e) {
            logger.error("Error creating product: {}", e.getMessage());
            throw new RuntimeException("Failed to create product");
        }
    }

    /*
     * O método busca um produto pelo ID fornecido.
     * Utiliza uma exceção customizada para lidar com casos em que o produto
     * não é encontrado, o que permite ao controlador retornar respostas
     * apropriadas para o cliente. A conversão para ProductDTO é feita para
     * encapsular os dados e garantir que apenas as informações necessárias
     * sejam expostas.
     */
    public ProductDTO findById(Long id) {
        try {
            Product product = productRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found for this id: " + id));
            return mapToDTO(product);
        } catch (ResourceNotFoundException e) {
            logger.error("Error finding product: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Error finding product: {}", e.getMessage());
            throw new RuntimeException("Failed to find product");
        }
    }

    /*
     * O método busca todos os produtos no banco de dados.
     * Utiliza paginação para lidar com grandes conjuntos de dados e ordenação
     * para permitir a classificação dos resultados. A conversão para ProductDTO
     * é feita para garantir que apenas as informações necessárias sejam expostas.
     */
    public Page<ProductDTO> findAll(int page, int size, String sort) {
        try {
            Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
            Page<Product> productsPage = productRepository.findAll(pageable);
            return productsPage.map(this::mapToDTO);
        } catch (Exception e) {
            logger.error("Error retrieving products: {}", e.getMessage());
            throw new RuntimeException("Failed to retrieve products");
        }
    }

    /*
     * Atualiza um produto com base no ID fornecido e nos dados fornecidos.
     * Utiliza uma exceção customizada para lidar com casos em que o produto
     * não é encontrado, o que permite ao controlador retornar respostas
     * apropriadas para o cliente. A validação é feita para garantir que os
     * dados estão corretos antes de persistir no banco de dados, minimizando
     * erros de entrada. A conversão para ProductDTO é feita para encapsular
     * os dados e garantir que apenas as informações necessárias sejam expostas.
     */
    @Transactional
    public ProductDTO update(Long id, @Valid ProductDTO productDTO) {
        try {
            Product product = productRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found for this id: " + id));

            product.setName(productDTO.name());
            product.setPrice(productDTO.price());
            product.setDescription(productDTO.description());
            product.setImage(productDTO.image());

            Product updatedProduct = productRepository.save(product);
            logger.info("Product updated with ID: {}", updatedProduct.getId());
            return mapToDTO(updatedProduct);
        } catch (ResourceNotFoundException e) {
            logger.error("Error updating product: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Error updating product: {}", e.getMessage());
            throw new RuntimeException("Failed to update product");
        }
    }

    /*
     * Deleta um produto com base no ID fornecido.
     * Utiliza uma exceção customizada para lidar com casos em que o produto
     * não é encontrado, o que permite ao controlador retornar respostas
     * apropriadas para o cliente.
     */
    public void delete(Long id) {
        try {
            Product product = productRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found for this id: " + id));
            productRepository.delete(product);
            logger.info("Product deleted with ID: {}", id);
        } catch (ResourceNotFoundException e) {
            logger.error("Error deleting product: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Error deleting product: {}", e.getMessage());
            throw new RuntimeException("Failed to delete product");
        }
    }

    /*
     * Busca produtos com base em uma consulta fornecida.
     * Utiliza uma exceção genérica para lidar com erros inesperados, o que
     * permite ao controlador retornar respostas apropriadas para o cliente.
     * A conversão para ProductDTO é feita para encapsular os dados e garantir
     * que apenas as informações necessárias sejam expostas.
     */
    public List<ProductDTO> search(String query) {
        try {
            List<Product> products = productRepository.findByNameContaining(query);
            return products.stream()
                    .map(this::mapToDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            logger.error("Error searching products: {}", e.getMessage());
            throw new RuntimeException("Failed to search products");
        }
    }

    /*
     * Converte um objeto Product para um objeto ProductDTO.
     * Isso é feito para encapsular os dados e garantir que apenas as informações
     * necessárias sejam expostas.
     */
    private ProductDTO mapToDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getPrice(),
                product.getDescription(),
                product.getImage()
        );
    }
}
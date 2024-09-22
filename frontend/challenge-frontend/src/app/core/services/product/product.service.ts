import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Product } from '../../../shared/interfaces/product.interface';
import { NotificationService } from '../notification/notification.service';

/**
 * Serviço responsável por realizar as requisições de produtos.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /**
   * URL base da API.
   * @private
   */
  private url = environment.apiUrl;

  /**
   * Construtor do serviço.
   * @param http
   * @param notificationService
   * @private
   * @returns Observable<{ content: Product[], totalElements: number}>
   *      Observable com a lista de produtos e o total de elementos.
   *      Caso ocorra um erro, retorna um Observable com o erro.
   *      Em ambos os casos, exibe uma notificação.
   */
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }

  /**
   * Método responsável por buscar os produtos.
   * @param page
   * @param size
   * @returns Observable<{ content: Product[], totalElements: number}>
   *       Observable com a lista de produtos e o total de elementos.
   *       Caso ocorra um erro, retorna um Observable com o erro.
   *       Em ambos os casos, exibe uma notificação.
   */
  getProducts(page: number, size: number): Observable<{ content: Product[], totalElements: number}> {
    return this.http.get<{ content: Product[], totalElements: number}>(`${this.url}/products?page=${page}&size=${size}`).pipe(
      catchError(error => {
        const errorMessage = `Erro ao buscar produtos: ${error.status} - ${error.message}`;
        this.notificationService.showError(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  /**
   * Método responsável por criar um produto.
   * @param product
   * @returns Observable<Product>
   *    Observable com o produto criado.
   *    Caso ocorra um erro, retorna um Observable com o erro.
   *    Em ambos os casos, exibe uma notificação.
   */
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.url}/products`, product).pipe(
      tap(() => this.notificationService.showSuccess('Produto criado com sucesso')),
      catchError(error => {
        const errorMessage = `Falha ao criar produto: ${error.status} - ${error.message}`;
        this.notificationService.showError(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  /**
   * Método responsável por atualizar um produto.
   * @param product
   * @returns Observable<Product>
   *   Observable com o produto atualizado.
   *   Caso ocorra um erro, retorna um Observable com o erro.
   *   Em ambos os casos, exibe uma notificação.
   */
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/products/${product.id}`, product).pipe(
      tap(() => this.notificationService.showSuccess('Produto atualizado com sucesso')),
      catchError(error => {
        const errorMessage = `Falha ao atualizar produto: ${error.status} - ${error.message}`;
        this.notificationService.showError(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  /**
   * Método responsável por deletar um produto.
   * @param id
   * @returns Observable<void>
   *   Observable vazio.
   *   Caso ocorra um erro, retorna um Observable com o erro.
   *   Em ambos os casos, exibe uma notificação.
   */
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/products/${id}`).pipe(
      tap(() => this.notificationService.showSuccess('Produto deletado com sucesso')),
      catchError(error => {
        const errorMessage = `Falha ao deletar produto: ${error.status} - ${error.message}`;
        this.notificationService.showError(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  /**
   * Método responsável por buscar um produto pelo id.
   * @param id
   * @returns Observable<Product>
   *   Observable com o produto buscado.
   *   Caso ocorra um erro, retorna um Observable com o erro.
   *   Em ambos os casos, exibe uma notificação.
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/products/${id}`).pipe(
      catchError(error => {
        const errorMessage = `Erro ao buscar produto: ${error.status} - ${error.message}`;
        this.notificationService.showError(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  /**
   * Método responsável por buscar um produto pelo nome.
   * @param name
   * @returns Observable<Product[]>
   *   Observable com a lista de produtos buscados.
   *   Caso ocorra um erro, retorna um Observable com o erro.
   */
  searchProductByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products/search`, { params: { query: name } }).pipe(
      catchError(error => {
        const errorMessage = `Erro ao buscar produtos pelo nome: ${error.status} - ${error.message}`;
        this.notificationService.showError(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}

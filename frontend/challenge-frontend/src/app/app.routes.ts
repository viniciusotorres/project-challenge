import { Routes } from '@angular/router';
import {ProductListComponent} from "./components/products/product-list/product-list.component";
import {ProductFormComponent} from "./components/products/product-form/product-form.component";

/**
 * Rotas da aplicação
 */
export const routes: Routes = [
  /**
   *  Redireciona para a rota de produtos caso a rota seja vazia
   */
  {
    path: '', redirectTo: '/produtos:', pathMatch: 'full'
  },
  /**
   * Rota de produtos para listagem de produtos
   */
  {
    path: 'produtos', component: ProductListComponent
  },
    /**
     * Rota de produtos com id para edição do produto
     */
  {
    path: 'produtos/:id', component: ProductFormComponent
  },
    /**
     *  Redireciona para a rota de produtos caso a rota seja inválida
     */
  {
    path: '**', redirectTo: '/produtos', pathMatch: 'full'
  }

];

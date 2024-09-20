import { Routes } from '@angular/router';
import {ProductListComponent} from "./components/products/product-list/product-list.component";
import {ProductFormComponent} from "./components/products/product-form/product-form.component";

export const routes: Routes = [
  {
    path: '', redirectTo: '/produtos):', pathMatch: 'full'
  },
  {
    path: 'produtos', component: ProductListComponent
  },
  {
    path: 'produtos/:id', component: ProductFormComponent
  }
];

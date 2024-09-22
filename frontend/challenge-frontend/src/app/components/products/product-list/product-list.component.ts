import {Component, ViewChild, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatInputModule} from '@angular/material/input';
import {ProductService} from "../../../core/services/product/product.service";
import {Product} from "../../../shared/interfaces/product.interface";
import {MatDialog} from "@angular/material/dialog";
import {ProductFormComponent} from "../product-form/product-form.component";
import {SearchComponent} from "../../../shared/components/search/search.component";
import {ButtonComponent} from "../../../shared/components/button/button.component";
import {TableComponent} from "../../../shared/components/table/table.component";
import {PaginatorComponent} from "../../../shared/components/paginator/paginator.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    SearchComponent,
    ButtonComponent,
    TableComponent,
    PaginatorComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
/**
 * @class ProductListComponent
 * @implements {OnInit}
 * @description
 * Componente que lista os produtos
 */
export class ProductListComponent implements OnInit {
  /**
   * @type {MatTableDataSource<Product>}
   * @description
   * Datasource da tabela de produtos
   */
  products = new MatTableDataSource<Product>([]);
  /**
   * @type {string[]}
   * @description
   * Colunas da tabela
   */
  displayedColumns: string[] = ['image', 'id', 'name', 'description', 'price', 'options'];

  /**
   * @type {MatPaginator}
   * @description
   * Paginador da tabela
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private productService: ProductService,
    public dialog: MatDialog) {
  }

  /**
   * @method ngOnInit
   * @description
   * Método de inicial
   */
  ngOnInit() {
    this.bringProducts();
  }

  /**
   * @method bringProducts
   * @param {number} page
   * @param {number} size
   * @description
   * Método que busca os produtos
   */
  bringProducts(page: number = 0, size: number = 10) {
    this.productService.getProducts(page, size).subscribe(
      (data: any) => {
        this.products.data = data.content;
      },
      (error: any) => {
        console.error('Erro ao buscar produtos:', error);
      }
    );
  }

  /**
   * @method onPageChange
   * @param {PageEvent} event
   * @description
   * Método que é chamado quando a página muda
   */
  onPageChange(event: PageEvent) {
    this.bringProducts(event.pageIndex, event.pageSize);
  }

  /**
   * @method applyFilter
   * @param event
   * @description
   * Método que pesquisa os produtos
   */
  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value;

    if (query) {
      this.productService.searchProductByName(query).subscribe(products => {
        this.products.data = products;
      });
    } else {
      this.bringProducts();
    }
  }

  addProduct() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bringProducts();
      }
    });
  }



}

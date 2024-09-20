import { Component, ViewChild, OnInit } from '@angular/core';
import { ProductService } from "../../../core/services/product.service";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginator, MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['image', 'id', 'name', 'description', 'price', 'options'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.bringProducts();
  }

  bringProducts(page: number = 0, size: number = 10) {
    this.productService.getProducts(page, size).subscribe((data: any) => {
      this.products.data = data.content;
      this.paginator.length = data.totalElements;
    });
  }

  onPageChange(event: PageEvent) {
    this.bringProducts(event.pageIndex, event.pageSize);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();
  }

  addProduct() {
    console.log('Adicionar Produto');
  }
}

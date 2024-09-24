import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {Product} from "../../interfaces/product.interface";
import {ProductService} from "../../../core/services/product/product.service";
import {ProductFormComponent} from "../../../components/products/product-form/product-form.component";
import {MatDialog} from "@angular/material/dialog";
import {MatIcon, MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-table',
  standalone: true,
    imports: [
        MatButton,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatTable,
      MatHeaderCellDef,
      MatIconModule
    ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
/**
 * Componente de tabela
 * @export
 * @class TableComponent
 */
export class TableComponent {
  /**
   * Dados da tabela
   * @memberof TableComponent
   * @type {MatTableDataSource<Product>}
   */
  @Input() dataSource!: MatTableDataSource<Product>;

  /**
   * Colunas da tabela
   * @memberof TableComponent
   * @type {string[]}
   */
  displayedColumns: string[] = ['image', 'id', 'name', 'description', 'price', 'options'];

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {
  }

  /**
   * Método responsável por deletar um produto.
   * @param id
   */
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(product => product.id !== id);
    });
  }

  /**
   * Método responsável por editar um produto.
   * @param product
   */
  editProduct(id: number): void {
    this.productService.getProductById(id).subscribe((fetchedProduct) => {
      const dialogRef = this.dialog.open(ProductFormComponent, {
        width: '800px',
        data: { product: fetchedProduct }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const page = 0
          const size = 10
          this.productService.getProducts(page, size).subscribe(response => {
            this.dataSource.data = response.content;
          });
        }
      });
    });
  }


}

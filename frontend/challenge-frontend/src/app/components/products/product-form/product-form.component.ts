import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {ProductService} from "../../../core/services/product/product.service";
import {Product} from "../../../shared/interfaces/product.interface";
import {Observable} from "rxjs";
import {NotificationService} from "../../../core/services/notification/notification.service";

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    MatLabel,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
/**
 * Componente responsável por exibir o formulário de produto.
 * @constructor
 * @param fb
 * @param dialogRef
 * @param data
 */
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  fileName = '';
  imageSrc: string | ArrayBuffer | null = null;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  /**
   * Método responsável por inicializar o componente.
   */
  ngOnInit(): void {
    this.initializeForm();
    this.setImageSrc();
  }

  /**
   * Método responsável por inicializar o formulário.
   * @private
   */
  private initializeForm(): void {
    this.productForm = this.fb.group({
      name: [this.data.product?.name || '', [Validators.required, Validators.minLength(3)]],
      description: [this.data.product?.description || '', Validators.required],
      price: [this.data.product?.price || 0, [Validators.required, Validators.min(0)]],
      image: [this.data.product?.image || '', Validators.required]
    });
  }

  /**
   * Método responsável por definir a fonte da imagem.
   * @private
   */
  private setImageSrc(): void {
    if (this.data.product?.image) {
      this.imageSrc = this.data.product.image;
    }
  }


  /**
   * Método responsável por selecionar o arquivo.
   * @param event
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFileSelection(file);
    }
  }

  /**
   * Método responsável por lidar com a seleção do arquivo.
   * @param file
   * @private
   */
  private handleFileSelection(file: File): void {
    this.fileName = file.name;
    this.productForm.patchValue({ image: this.fileName });
    this.readFile(file);
  }

  /**
   * Método responsável por ler o arquivo selecionado.
   * @param file
   * @private
   */
  private readFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(file);
  }


  /**
   * Método responsável por fechar o dialog.
   */
  closeDialog() {
    this.dialogRef.close();
  }

  /**
   * Método responsável por salvar o produto.
   */
  saveProduct(): void {
    if (this.productForm.valid) {
      const formValue = this.prepareFormValue();
      const saveOperation = this.data.product ? this.updateExistingProduct(formValue) : this.createNewProduct(formValue);

      saveOperation.subscribe(() => this.dialogRef.close(formValue));
    }
  }
  /**
   * Método responsável por preparar o valor do formulário.
   * @private
   */
  private prepareFormValue(): Product {
    const formValue: Product = { ...this.productForm.value };
    formValue.price = this.parsePrice(formValue.price);
    if (this.data.product) formValue.id = this.data.product.id;
    return formValue;
  }

  /**
   * Método responsável por converter o preço para número.
   * @param price
   * @private
   */
  private parsePrice(price: string | number): number {
    return typeof price === 'string' ? parseFloat(price.replace(/[R$\s.]/g, '').replace(',', '.')) : price;
  }

  /**
   * Método responsável por atualizar um produto existente.
   * @param product
   * @private
   */
  private updateExistingProduct(product: Product): Observable<Product> {
    return this.productService.updateProduct(product);
  }

  /**
   * Método responsável por criar um novo produto.
   * @param product
   * @private
   */
  private createNewProduct(product: Product): Observable<Product> {
    return this.productService.createProduct(product);
  }
  /**
   * Método responsável por formatar o valor do input de preço.
   * @param event
   */
  formatCurrency(event: Event): void {
    const input = event.target as HTMLInputElement;

    let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    value = (Number(value) / 100).toFixed(2); // Divide por 100 para obter o valor correto

    value = value.replace('.', ','); // Substitui o ponto pela vírgula

    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona o separador de milhar

    this.productForm.patchValue({ price: `R$ ${value}` }); // Atualiza o valor do form control
  }
}

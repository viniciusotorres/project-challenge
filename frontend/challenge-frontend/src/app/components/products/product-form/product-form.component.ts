import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ProductService } from "../../../core/services/product/product.service";
import { Product } from "../../../shared/interfaces/product.interface";
import { Observable } from "rxjs";
import { NotificationService } from "../../../core/services/notification/notification.service";

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
export class ProductFormComponent implements OnInit {
  /** @type {boolean} Indica se o formulário está em modo de edição */
  isEditMode: boolean = false;
  /** @type {FormGroup} Formulário do produto */
  productForm!: FormGroup;
  /** @type {string} Nome do arquivo selecionado */
  fileName = '';
  /** @type {string | ArrayBuffer | null} Fonte da imagem a ser exibida */
  imageSrc: string | ArrayBuffer | null = null;
  /** @type {File | null} Arquivo selecionado */
  selectedFile: File | null = null;

  /**
   * Construtor do ProductFormComponent
   * @param {ProductService} productService - Serviço para manipulação de produtos
   * @param {FormBuilder} fb - Serviço de construção de formulários
   * @param {MatDialogRef<ProductFormComponent>} dialogRef - Referência ao diálogo
   * @param {any} data - Dados passados para o diálogo
   */
  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  /**
   * Hook de ciclo de vida chamado após a inicialização das propriedades ligadas a dados
   */
  ngOnInit(): void {
    this.initializeForm();
    this.setImageSrc();
    this.isEditMode = !!this.data.product;
  }

  /**
   * Inicializa o formulário do produto
   * @private
   */
  private initializeForm(): void {
    this.productForm = this.fb.group({
      name: [this.data.product?.name || '', [Validators.required, Validators.minLength(3)]],
      description: [this.data.product?.description || '', Validators.required],
      price: [this.data.product?.price || 0.01, [Validators.required, Validators.min(0)]],
      image: [this.data.product?.image || null, Validators.required]
    });
  }

  /**
   * Define a fonte da imagem se o produto tiver uma imagem
   * @private
   */
  private setImageSrc(): void {
    if (this.data.product?.image) {
      this.imageSrc = this.data.product.image;
    }
  }

  /**
   * Manipula o evento de seleção de arquivo
   * @param {Event} event - Evento de seleção de arquivo
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.isEditMode = false;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFileSelection(file);
    }
  }

  /**
   * Manipula o arquivo selecionado
   * @param {File} file - Arquivo selecionado
   * @private
   */
  private handleFileSelection(file: File): void {
    this.fileName = file.name;
    this.selectedFile = file;
    this.productForm.patchValue({ image: file });
    this.readFile(file);
  }

  /**
   * Lê o arquivo selecionado e define a fonte da imagem
   * @param {File} file - Arquivo selecionado
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
   * Fecha o diálogo
   */
  closeDialog() {
    this.dialogRef.close();
  }

  /**
   * Salva o produto
   */
  saveProduct(): void {
    if (this.productForm.valid) {
      const formData = this.prepareFormValue();
      const saveOperation = this.data.product ? this.updateExistingProduct(formData) : this.createNewProduct(formData);

      saveOperation.subscribe(() => this.dialogRef.close(formData));
    }
  }

  /**
   * Prepara o valor do formulário para ser enviado ao servidor
   * @returns {FormData} Dados do formulário a serem enviados ao servidor
   * @private
   */
  private prepareFormValue(): FormData {
    const formValue: Product = { ...this.productForm.value };
    formValue.price = this.parsePrice(formValue.price);
    if (this.data.product) formValue.id = this.data.product.id;

    const formData = new FormData();
    formData.append('name', formValue.name);
    formData.append('description', formValue.description);
    formData.append('price', formValue.price.toString());

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else if (this.isEditMode && this.data.product?.image) {
      formData.append('image', this.data.product.image);
    }

    if (formValue.id) {
      formData.append('id', formValue.id.toString());
      console.log('id', formValue.id);
    }

    return formData;
  }


  /**
   * Converte o preço para um número
   * @param {string | number} price - Preço a ser convertido
   * @returns {number} Preço convertido
   * @private
   */
  private parsePrice(price: string | number): number {
    return typeof price === 'string' ? parseFloat(price.replace(/[R$\s.]/g, '').replace(',', '.')) : price;
  }

  /**
   * Atualiza um produto existente
   * @param {FormData} formData - Dados do formulário a serem enviados ao servidor
   * @returns {Observable<any>} Observable para a operação de atualização
   * @private
   */
  private updateExistingProduct(formData: FormData): Observable<any> {
    const productId = this.data.product.id;
    return this.productService.updateProduct(productId, formData);
  }
  /**
   * Cria um novo produto
   * @param {FormData} formData - Dados do formulário a serem enviados ao servidor
   * @returns {Observable<any>} Observable para a operação de criação
   * @private
   */
  private createNewProduct(formData: FormData): Observable<any> {
    return this.productService.createProduct(formData);
  }

  /**
   * Formata a entrada de moeda
   * @param {Event} event - Evento de entrada
   */
  formatCurrency(event: Event): void {
    const input = event.target as HTMLInputElement;

    let value = input.value.replace(/\D/g, '');

    let numericValue = Number(value) / 100;

    if (numericValue <= 0) {
      numericValue = 0.01;
    } else if (numericValue > 10000) {
      numericValue = 10000;
    }

    value = numericValue.toFixed(2);

    value = value.replace('.', ',');

    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    this.productForm.patchValue({ price: `R$ ${value}` });
  }
}

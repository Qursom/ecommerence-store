import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import {PRODUCTS_URL,PRODUCT_BY_ID_URL } from '../shared/constant';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent,CommonModule,PaginatorModule,EditPopupComponent,ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  {
  @ViewChild('paginator') paginator: Paginator | undefined;

  products:Product[]=[]

  totalRecords:number =0;
  rows:number=5;
  displayAddPopup: boolean = false;
  displayEditPopup:boolean = false;
  selectedProduct: Product = {
    _id:'',
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };


  constructor( private productsService:ProductsService){

  }

  onOutputProduct(product:Product) {
    console.log("product",product);
   }
  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts(PRODUCTS_URL, { page, perPage })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  editProduct(product: Product, id: string) {
    this.productsService
      .editProduct(PRODUCT_BY_ID_URL+`${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteProduct(id: string) {
    this.productsService
      .deleteProduct(PRODUCT_BY_ID_URL+`${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addProduct(product: Product) {
    this.productsService
      .addProduct(PRODUCTS_URL, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
     
        },
        error: (error) => {
          console.log(error);
        },
      });
  }




  onConfirmEdit(product:Product){
   if(!this.selectedProduct._id){
    return
   }

    this.editProduct(product,this.selectedProduct._id??'');
    this.displayEditPopup = false;
  }

  onConfirmAdd(product:Product){

    this.addProduct(product);
    this.displayAddPopup = false;

  }
  

  
  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if (!product._id) {
      return;
    }

    this.deleteProduct(product._id);
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }


  
  ngOnInit(){

   this.fetchProducts(0,this.rows);

  }

  
  resetPaginator() {
    this.paginator?.changePage(0);
  }
}

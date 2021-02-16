import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ProductsService } from './../../../core/services/products/products.service';
import { Product } from './../../../core/models/product.model';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void{
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchProduct(id);
    });
  }

  fetchProduct(id: string): void{
    this.productsService.getProduct(id)
    .subscribe(product => {
      this.product = product;
    })
  }

  createProduct(): void{
    const newProduct: Product = {
      id: '222',
      title: 'nuevo desde angular',
      image: 'assets/images/banner-1.jpg',
      price: 3000,
      description: 'nuevo product'
    };
    this.productsService.createProduct(newProduct)
    .subscribe(product => {
      console.log(product)
    });
  }

  updateProduct(): void{
    const updateProduct: Partial<Product> = {
      price: 80000,
      description: 'edicion product'
    };
    this.productsService.updateProduct('2',updateProduct)
    .subscribe(product => {
      console.log(product)
    });
  }

  deleteProduct(): void{
    this.productsService.deleteProduct('321')
    .subscribe(product => {
      console.log(product)
    });
  }

}

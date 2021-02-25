import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Product } from './../../../core/models/product.model';
import { ProductsService } from '../../../core/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  private itemsCollection: AngularFirestoreCollection<Product>;
  item$: Observable<Product[]>;

  constructor(
    private productsService: ProductsService,
    private afs: AngularFirestore,
  ) { 
    this.itemsCollection = this.afs.collection<Product>('products');
    this.item$ = this.itemsCollection.valueChanges();
  }

  ngOnInit(): void{
    this.fetchProducts();
  }

  clickProduct(id: number): void{
    console.log('product');
    console.log(id);
  }

  fetchProducts() {
    // this.productsService.getAllProducts()
    // .subscribe(products => {
    //   this.products = products;
    // });
    this.item$.subscribe(product => {
      if (product){
        this.products = product;
      }else {
        console.error('Unable to delete the product');
      }
    });
  }

}

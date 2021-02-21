import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../../core/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products = [];
  displayedColumns: string[] = ['title', 'price', 'description', 'actions'];

  private itemsCollection: AngularFirestoreCollection<Product>;
  items: Observable<Product[]>;

  constructor(
    private productsService: ProductsService,
    private afs: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(){
    // this.productsService.getAllProducts()
    // .subscribe(products => {
    //   this.products = products;
    // });
    this.itemsCollection = this.afs.collection<Product>('products');
    this.items = this.itemsCollection.valueChanges();
    this.items.subscribe(product => {
      if (product){
        this.products = product
      }else {
        console.error('Unable to delete the product');
      }
    });
  }

  deleteProduct(id: string): void{
    const product = this.afs.collection<Product>("products")
    .doc(id).delete().then((docRef) => {
      console.log("Document deleted with ID: ", id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  }

}

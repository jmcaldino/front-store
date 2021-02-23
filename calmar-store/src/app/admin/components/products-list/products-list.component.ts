import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource , MatTable} from '@angular/material/table';
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
export class ProductsListComponent implements AfterViewInit {

  products: Product[] = [];
  displayedColumns: string[] = ['title', 'price', 'description', 'actions'];
  dataSource: MatTableDataSource<Product>;

  private itemsCollection: AngularFirestoreCollection<Product>;
  items: Observable<Product[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.itemsCollection = this.afs.collection<Product>('products');
    this.items = this.itemsCollection.valueChanges();
    this.items.subscribe(product => {
      if (product){
        this.dataSource = new MatTableDataSource(product);
        // Assign the paginator *after* dataSource is set
        this.dataSource.paginator = this.paginator;
      }else {
        console.error('Unable to delete the product');
      }
    });
    this.dataSource.paginator;
  }

  constructor(
    private afs: AngularFirestore,
    private router: Router
  ) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim(); // Remove whitespace
    this.dataSource.filter = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    // this.dataSource.filter = filterValue;
  }

  fetchProducts(){
    // this.productsService.getAllProducts()
    // .subscribe(products => {
    //   this.products = products;
    // });
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

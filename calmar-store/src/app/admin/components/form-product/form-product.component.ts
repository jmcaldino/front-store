import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { finalize } from 'rxjs/operators';

import { MyValidators } from './../../../utils/validators';

import { ProductsService } from './../../../core/services/products/products.service';
import { Observable } from 'rxjs';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form: FormGroup;
  image$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      // const product = this.form.value;
      // this.productsService.createProduct(product)
      // .subscribe((newProduct) => {
      //   console.log(newProduct);
      //   this.router.navigate(['./admin/products']);
      // });
      const product = this.form.value;
      const productsCollection = this.afs.collection<Product>('products');
      productsCollection.add(product).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        product.id = docRef.id;
        this.afs.collection("products").doc(docRef.id).update(product);
        this.router.navigate(['./admin/products']);
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    }
  }

  uploadFile(event) {
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const name = file.name;
    const filePath = `uploads/images/${id}_${name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          console.log(url);
          this.form.get('image').setValue(url);
        });
      })
    )
    .subscribe();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]],
    });
  }

  get priceField() {
    return this.form.get('price');
  }

}


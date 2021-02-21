import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from '../../../core/services/products/products.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MyValidators } from '../../../utils/validators';
import { Product } from '../../../core/models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  img: string;
  form: FormGroup;
  id: string;

  constructor(
    private FormBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private afs: AngularFirestore
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = params.id;

      const product = this.afs.collection<Product>("products")
      .doc(this.id).get().subscribe(res => {
        //this.form.patchValue(res.data())});
        this.form.patchValue({
              id: res.id,
              title: res.get('title'),
              price: res.get('price'),
              image: res.get('image'),
              description: res.get('description')
            });
            this.img = res.get('image');
          });
      });
      // this.productsService.getProduct(this.id)
      // .subscribe(product => {
      //   this.form.patchValue({
      //     id: product.id,
      //     title: product.title,
      //     price: product.price,
      //     image: product.image,
      //     description: product.description
      //   });
      // });  // ó => { ..form.patchValue(product)});
  }

  saveProduct(event: Event): void{
    event.preventDefault();
    if (this.form.valid){
      const product = this.form.value;
      this.afs.collection("products").doc(product.id).update(product)
      .then((docRef) => {
        console.log("Document updated.");
        this.router.navigate(['./admin/products']);
      })
      .catch((error) => {
          console.error("Error updating document: ", error);
      });
      // this.productsService.updateProduct(this.id, product)
      // .subscribe((newProduct) => {
      //   console.log(newProduct);
      //   this.router.navigate(['./admin/products']);
      // });
    }
  }

  private buildForm(): void{
    this.form = this.FormBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
      description: ['']
    });
  }

  get priceField(){
    return this.form.get('price');
  }


}

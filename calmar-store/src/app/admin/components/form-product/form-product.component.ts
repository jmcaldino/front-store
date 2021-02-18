import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../../../core/services/products/products.service';
import { Router } from '@angular/router';
import { MyValidators } from '../../../utils/validators';
@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form: FormGroup;

  constructor(
    private FormBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  saveProduct(event: Event): void{
    event.preventDefault();
    if(this.form.valid){
      const product = this.form.value;
      this.productsService.createProduct(product)
      .subscribe((newProduct) => {
        console.log(this.form.value);
        this.router.navigate(['./admin/products']);
      });
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

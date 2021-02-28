import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { LayoutModule } from '@angular/cdk/layout';
import { SidenavLeftComponent } from './components/sidenav-left/sidenav-left.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductsComponent,
    SidenavLeftComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
    MaterialModule,
    NgxPaginationModule,
    LayoutModule
  ]
})
export class ProductModule {

}

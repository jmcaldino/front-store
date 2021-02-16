import { Component, OnInit } from '@angular/core';

import { Product } from './../../../core/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [
    {
      id: '1',
      image: 'assets/images/1597109494558_escobillon-recto-n5-romyl-art-61-gaj.jpg',
      title: 'Escobillon',
      price: 80000,
      description: 'bla bla bla bla bla'
    },
    {
      id: '2',
      image: 'assets/images/1597109788293_CANASTO CALADO 50 LT.jpg',
      title: 'Canasto',
      price: 80000,
      description: 'bla bla bla bla bla'
    },
    {
      id: '3',
      image: 'assets/images/1597110057269_CABO HIERRO ROYCO.jpg',
      title: 'Cabo Hierro',
      price: 80000,
      description: 'bla bla bla bla bla'
    },
    {
      id: '4',
      image: 'assets/images/1597110228856_cabo de madera.jpg',
      title: 'Cabo Madera',
      price: 80000,
      description: 'bla bla bla bla bla'
    },
    {
      id: '5',
      image: 'assets/images/stickers1.png',
      title: 'Stickers',
      price: 80000,
      description: 'bla bla bla bla bla'
    },
    {
      id: '6',
      image: 'assets/images/stickers2.png',
      title: 'Stickers',
      price: 80000,
      description: 'bla bla bla bla bla'
    },
  ];

  constructor() { }

  ngOnInit(): void{
  }

  clickProduct(id: number): void{
    console.log('product');
    console.log(id);
  }

}

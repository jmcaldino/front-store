import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { CartService } from './../../../core/services/cart.service';
import { Item } from '../../../core/models/itemProduct.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  items$: Observable<Item[]>

  constructor(
    private cartService: CartService
  ) {
    this.items$ = this.cartService.cart$
    .pipe(
      map((items: Item[])  => {
        const distinctItems = [];
        items.forEach(currentItem => {
          const distinctIds = distinctItems.map(item => item.id);
          if(distinctIds.indexOf(currentItem.id) === -1){
            currentItem.quantity = 1;
            currentItem.subTotal = currentItem.price;
            distinctItems.push(currentItem);
          }else{
            currentItem.quantity++;
            currentItem.subTotal += currentItem.price;
          }
        });
        return distinctItems;
      })
    );
  }

  ngOnInit(): void {
  }
}

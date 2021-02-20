import { Product } from './product.model';

export interface Item extends Product {
    quantity?: number;
    subTotal?: number;
    total?: number;
}

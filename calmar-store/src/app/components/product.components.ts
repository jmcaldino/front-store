import { Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    OnInit,
    DoCheck,
    OnDestroy } from '@angular/core';
import { Product } from '../product.model';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, DoCheck, OnDestroy {
    title = 'calmar-store';

    @Input() product: Product;  // decimos que var. product va a recibir datos de otro componente
    @Output() productClick: EventEmitter<any> = new EventEmitter();  // decimos que enviaremos un evento de tipo producto

    today = new Date();

    contructor(): void {
        console.log('constructor');
    }

    ngOnInit(): void{
        console.log('3. ngOnInit');
    }

    ngDoCheck(): void{
        console.log('4. ngDoCheck');
    }

    ngOnDestroy(): void{
        console.log('5. ngOnDestroy');
    }

    addCart(): void {
        /* Enviamos el ID product al llamarse al evento */
        console.log('añadir al carrito');
        this.productClick.emit(this.product.id);
    }

}

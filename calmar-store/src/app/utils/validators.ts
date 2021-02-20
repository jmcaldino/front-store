import { AbstractControl } from '@angular/forms';
'';
export class MyValidators{

    static isPriceValid(control: AbstractControl){
        const value = control.value;
        console.log(value);
        if (value && value < 0 || value == 0){
            return {price_invalid: true};
        }
        return null;
    }

}

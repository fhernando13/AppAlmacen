import { Validators, ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators extends Validators {
    
    static onlyNumbers(control: AbstractControl): ValidationErrors | null {
        return /^\d+$/.test(control.value) ? null : { onlyNumbers: true };
    }
  
     static onlyLetters(control: AbstractControl): ValidationErrors | null {
        return /^[a-z\s\u00E0-\u00FC\u00f1]*$/i.test(control.value) ? null : { onlyLetters: true };
    }
}
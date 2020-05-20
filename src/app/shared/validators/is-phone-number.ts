import { FormControl } from '@angular/forms';
import { parsePhoneNumber } from 'libphonenumber-js';


export function isValidPhoneNumber(control: FormControl) {
    const broj = control.value;
    if (!broj) {return null; }
    try {
        const parsedPhoneNumber = parsePhoneNumber(broj);
        return parsedPhoneNumber.isValid() ? null : { phoneNumber: { valid: false } };
    } catch (e) {
        console.log('Greska');
        return { phoneNumber: { valid: false } };
    }


  }

import { PipeTransform, Pipe } from '@angular/core';
import { Contact } from '../contact';

@Pipe({
    name: 'phonebookFilter'
})

export class PhoneBookFilterPipe implements PipeTransform {
    transform(phonebook: Contact[], searchTerm: string): Contact[] {
        if (!phonebook || !searchTerm) {
            return phonebook;
        }

        return phonebook.filter(contact =>
            contact.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}

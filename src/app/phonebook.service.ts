import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { Phonebook } from './phonebook-database';

@Injectable({
  providedIn: 'root'
})
export class PhonebookService {


  constructor() { }

  getAllContacts(): Contact[] {
    return Phonebook;
  }


  add(contact: Contact) {
    Phonebook.push(contact);
    console.log('Contact added.');
  }

  delete(index: number) {
    Phonebook.splice(index, 1);
    console.log('Contact deleted.');
  }

  edit(contact: Contact, index: number) {
    Phonebook[index] = contact;
    console.log('Contact edited.');
  }


}

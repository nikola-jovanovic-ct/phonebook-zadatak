import { Component, OnInit } from '@angular/core';
import { PhonebookService } from '../phonebook.service';
import { Contact } from '../contact';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css']
})
export class PhonebookComponent implements OnInit {
  searchTerm: string;

  constructor(private phonebookService: PhonebookService) { }

  phonebook = this.phonebookService.getAllContacts();

  theChosenOne = new Contact('', '', '');
  isSelected = false;
  indeks = this.phonebook.indexOf(this.theChosenOne);

  contactForm = new FormGroup({
    name: new FormControl(''),
    number: new FormControl(''),
    mail: new FormControl(''),
  });

  editForm = new FormGroup({
    name: new FormControl(''),
    number: new FormControl(''),
    mail: new FormControl(''),
  });

  ngOnInit(): void {
    console.log(this.phonebookService.getAllContacts());
  }

  onSelect(contact: Contact) {
    this.isSelected = true;
    this.theChosenOne = contact;
    this.indeks = this.phonebook.indexOf(this.theChosenOne);

    this.editForm.setValue({name: this.theChosenOne.name,
      number: this.theChosenOne.number,
      mail: this.theChosenOne.mail});

  }

  deleteContact() {
   this.phonebookService.delete(this.phonebook.indexOf(this.theChosenOne, 0));
   this.isSelected = false;
  }

  addContact() {
    this.phonebookService.add(this.contactForm.value);
  }

  editContact() {
   this.theChosenOne = this.editForm.value;
   this.phonebookService.edit(this.theChosenOne, this.indeks);
  }


}

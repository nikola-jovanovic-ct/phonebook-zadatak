import { Component, OnInit } from '@angular/core';
import { PhonebookService } from '../phonebook.service';
import { Contact } from '../contact';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { isValidPhoneNumber } from '../shared/validators/is-phone-number';
import { parsePhoneNumber } from 'libphonenumber-js';


@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css']
})
export class PhonebookComponent implements OnInit {
  searchTerm: string;

  constructor(private phonebookService: PhonebookService) { }

  phonebook = this.phonebookService.getAllContacts();

  showName = false;
  showNumber = false;
  showMail = false;

  theChosenOne = new Contact('', '', '');
  isSelected = false;
  indeks = this.phonebook.indexOf(this.theChosenOne);

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required,  Validators.pattern('^[a-zA-Z]{1,20}\ [a-zA-Z]{1,20}$') ] ),
    number: new FormControl('', [Validators.required, isValidPhoneNumber ]),
    mail: new FormControl('', [Validators.required, Validators.email]),
  });

  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
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
    if (!this.contactForm.valid)  {
      this.showNameMethod();
      this.showNumberMethod();
      this.showMailMethod();
      } else {
        /*this.phonebookService.add(new Contact (this.contactForm.get('name').value,
        (parsePhoneNumber(this.contactForm.get('number').value).number) as string,
        this.contactForm.get('mail').value)); */
        this.phonebookService.add(this.contactForm.value);
        this.showName = false;
        this.showNumber = false;
        this.showMail = false;
   }
  }

  editContact() {
    if (!this.editForm.valid) {console.log('Not ok'); } else {
     this.theChosenOne = this.editForm.value; this.phonebookService.edit(this.theChosenOne, this.indeks); }
  }


  showNameMethod() { if (!this.contactForm.get('name').valid) {
    this.showName = true;
    } else {this.showName = false; }

  }
  showNumberMethod() { if (!this.contactForm.get('number').valid) {
    this.showNumber = true;
    } else {this.showNumber = false; }
  }

  showMailMethod() { if (!this.contactForm.get('mail').valid) {
    this.showMail = true;
    } else {this.showMail = false; }
  }

}

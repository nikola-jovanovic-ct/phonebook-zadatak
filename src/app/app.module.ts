import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { PhonebookComponent } from './phonebook/phonebook.component';
import { PhoneBookFilterPipe } from './phonebook/phonebook-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PhonebookComponent,
    PhoneBookFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

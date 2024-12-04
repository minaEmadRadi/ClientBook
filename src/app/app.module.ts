import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './componants/books/books.component';
import { BooksService } from './services/books.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { ToastModule } from 'primeng/toast'; 
import { MessageService } from 'primeng/api'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';  // Import DialogModule
import { TableModule } from 'primeng/table';  // Import TableModule
import { ButtonModule } from 'primeng/button';
// Import necessary PrimeNG modules
import { InputTextModule } from 'primeng/inputtext';  // If you're using input fields like for adding/editing books
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    BooksComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ToastModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule,
    InputTextModule,
    HttpClientModule,
    TableModule
  ],
  providers: [BooksService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

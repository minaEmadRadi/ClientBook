import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Book } from '../../../Models/Book';
import { BooksService } from '../../services/books.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-books',
  standalone: false,
  
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishYear: 1925, genre: 'Fiction' },
    { id: 2, title: '1984', author: 'George Orwell', publishYear: 1949, genre: 'Dystopian' },
  ];
    newBook: Book = {
    title: '',
    author: '',
    publishYear: new Date().getFullYear(),
    genre: ''
  };
  editingBook: Book = {
    title: '',
    author: '',
    publishYear: new Date().getFullYear(),
    genre: ''
  };
  displayAddDialog: boolean = false;
  displayEditDialog: boolean = false;

  constructor( private service: BooksService ,private errorHandler: ErrorHandlerService,private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getAllBooks();
    console.log("Books on Init:", this.books); // Check if books are populated
    this.cdRef.detectChanges();
    }
  getAllBooks() {
     this.service.Getallbooks().subscribe(
      (data) => {
        console.log('Data received:', data);
        this.books = data.res;    
        this.cdRef.detectChanges(); 
      },
      (error) => {
        console.error('Error occurred:', error);
        this.errorHandler.showError('Failed to fetch books.');
      }
    );
  }
  addBook(): void {
    const newBook: Book = {
      title: this.newBook.title,
      author: this.newBook.author,
      publishYear: this.newBook.publishYear,
      genre: this.newBook.genre
    };

    this.service.addBook(newBook).subscribe({
      next: (response) => {
        console.log('Book added:', response.res);
        this.errorHandler.showSuccess('Book added successfully!'); // Show success message
        this.getAllBooks();
        this.closeAddDialog();
      },
      error: (err) => {
        console.error('Error adding book:', err);
        this.errorHandler.showError('Error adding book.'); // Show error message
      }
    });
  }
  updateBook(book: Book): void {
    this.service.updateBook(book.id!, book).subscribe({
      next: (response) => {
        console.log('Book updated:', response.res);
        this.getAllBooks(); // Refresh the list
        this.errorHandler.showSuccess('Book updated successfully!'); // Show success message
        this.closeEditDialog();
      },
      error: (err) => {
        console.error('Error updating book:', err);
        this.errorHandler.showError('Error updating book.'); // Show error message
      }
    });
  }
  editBook(book: Book): void {
    this.editingBook = { ...book };
  }


  

  deleteBook(id: number): void {
    this.service.deleteBook(id).subscribe({
      next: (response) => {
        console.log('Book deleted:', response.res);
        this.getAllBooks(); // Refresh the list
        this.errorHandler.showSuccess('Book deleted successfully!'); // Show success message
      },
      error: (err) => {
        console.error('Error deleting book:', err);
        this.errorHandler.showError('Error deleting book.'); // Show error message
      }
    });
  }
  openAddDialog() {
    this.newBook = {
      title: '',
      author: '',
      publishYear: new Date().getFullYear(),
      genre: ''
    };
    this.displayAddDialog = true;
  }

  closeAddDialog() {
    this.displayAddDialog = false;
  }

  openEditDialog(book: Book) {
    this.editingBook = { ...book };
    this.displayEditDialog = true;
  }

  closeEditDialog() {
    this.displayEditDialog = false;
  }
}

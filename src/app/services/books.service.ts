import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../Models/Book';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  api : string = "http://localhost:5139/api";

  constructor( private http: HttpClient) { }
  public Getallbooks():Observable<any>{
    return this.http.get(`${this.api}/books`);
  }

  // Get a book by ID
  getById(id: number): Observable<any> {
    return this.http.get(`${this.api}/books/${id}`);
  }

  // Add a new book
  addBook(book: Book): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.api}/books`, book, { headers });
  }

  // Delete a book by ID
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.api}/books/${id}`);
  }
  updateBook(id: number, book: Book): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.api}/books/${id}`, book, { headers });
  }
  
}

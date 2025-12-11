import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  url = 'https://bookstore-backend-v2-1.onrender.com/';
  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<any> {
    const url = this.url+`api/books`
    return this.http.get<any>(url);
  }

  getBookById(bookId: number): Observable<any> {
    const url = this.url+`api/books/${encodeURIComponent(bookId)}`
    return this.http.get<any>(url);
  }

  updateBook(bookId: number) {
    const url = this.url+`api/books/${encodeURIComponent(bookId)}/purchase`
    const patchHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json-patch+json',
      Accept: 'application/json',
    });
    const patchHttpOptions = {
      headers: patchHeaders,
    };
    return this.http.put<any>(url, patchHttpOptions)
  }
}

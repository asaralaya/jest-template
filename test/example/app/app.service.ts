import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) { }

  // Example method to make an HTTP GET request
  public getData(): Observable<any> {
    const url = `${this.apiUrl}/data`;
    return this.http.get(url);
  }

  // Example method to make an HTTP POST request
  public postData(data: any): Observable<any> {
    const url = `${this.apiUrl}/data`;
    return this.http.post(url, data);
  }

  // Example method for some custom logic
  public performCustomLogic(value: string): string {
    // Perform some operations and return a result
    return `Processed value: ${value}`;
  }
}
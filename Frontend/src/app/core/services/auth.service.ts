import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Register a new user
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, userData);
  }

  // Login an existing user
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
    console.log("credentials------",credentials);
  }
}
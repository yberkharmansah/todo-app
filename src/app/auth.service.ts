import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5000'; // Backend URL'nizi buraya ekleyin

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }
  register(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password });
  }
  getUserById(userId: number) {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }
  setUserId(userId: number): void {
    if (localStorage) {
      localStorage.setItem('user_id', userId.toString());
    } else {
      console.error('LocalStorage is not supported.');
    }
  }

  getUserId(): number | null {
    if (localStorage) {
      const userId = localStorage.getItem('user_id');
      return userId ? parseInt(userId, 10) : null;
    } else {
      console.error('LocalStorage is not supported.');
      return null;
    }
  }

  clearUserId(): void {
    if (localStorage) {
      localStorage.removeItem('user_id');
    } else {
      console.error('LocalStorage is not supported.');
    }
  }
}

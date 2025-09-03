// core/services/user/user_service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiUrl = 'http://localhost:8081/users';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get(this.apiUrl + '/profile');
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put(this.apiUrl + '/profile', data);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateUserById(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteUserById(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  postUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getUserByDepartment(department: string): Observable<any> {
    // Codificar el nombre del departamento para la URL
    const encodedDepartment = encodeURIComponent(department);
    return this.http.get(this.apiUrl + '/department/' + encodedDepartment);
  }
}
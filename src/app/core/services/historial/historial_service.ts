// src/app/core/services/historial/historial_service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HistoryEntry {
  movimiento: string;
  fecha_registro: string;
  file: { nombre: string } | null;
  user: { nombre: string, apellidos: string };
  folder: { name: string };
}

@Injectable({ providedIn: 'root' })
export class HistorialService {
  private apiUrl = 'http://localhost:8081/history/';

  constructor(private http: HttpClient) {}

  getHistoryByDepartment(department: string): Observable<HistoryEntry[]> {
    return this.http.get<HistoryEntry[]>(`${this.apiUrl}${encodeURIComponent(department)}`);
  }
} 

// src/app/core/services/historial/historial_service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HistoryEntry {
  Movimiento: string;
  Fecha_registro: string;
  Id_file: { nombre: string };
  Id_user: { nombre: string };
  Id_folder: { nombre: string };
}

@Injectable({ providedIn: 'root' })
export class HistorialService {
  private apiUrl = 'http://localhost:8081/historial/';

  constructor(private http: HttpClient) {}

  getHistoryByDepartment(department: string): Observable<HistoryEntry[]> {
    return this.http.get<HistoryEntry[]>(`${this.apiUrl}${encodeURIComponent(department)}`);
  }
}

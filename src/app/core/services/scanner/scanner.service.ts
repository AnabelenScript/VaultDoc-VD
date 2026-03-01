import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ScannerService {

  private api = 'http://localhost:7000/api/scan';

  constructor(private http: HttpClient) {}

  detectCorners(file: File) {
    const fd = new FormData();
    fd.append('file', file);

    return this.http.post<any>(`${this.api}/detect-corners`, fd);
  }

  transformPerspective(file: File, points: any[]) {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('points', JSON.stringify(points));

    return this.http.post<any>(`${this.api}/transform-perspective`, fd);
  }

  sendToFinalApi(file: File, json: any) {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('json', JSON.stringify(json));

    return this.http.post(
      'http://localhost:8081/files/',
      fd,
      { headers: { Authorization: 'Bearer TOKEN' } }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PolizaService {
  private apiUrl = `${environment.apiUrl}polizas/`;

  constructor(private http: HttpClient) { }

  getPolizas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPoliza(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`);
  }

  createPoliza(poliza: any): Observable<any> {
    return this.http.post(this.apiUrl, poliza);
  }

  updatePoliza(id: number, poliza: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, poliza);
  }

  deletePoliza(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  getPolizasProximasVencer(fecha?: string): Observable<any[]> {
    const url = fecha 
      ? `${this.apiUrl}proximas-vencer/?fecha=${fecha}`
      : `${this.apiUrl}proximas-vencer/`;
    return this.http.get<any[]>(url);
  }
}
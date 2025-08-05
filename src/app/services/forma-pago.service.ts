// src/app/services/formapago.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Assuming you have an environment file

@Injectable({
  providedIn: 'root'
})
export class FormaPagoService {
  private apiUrl = `${environment.apiUrl}formas-pago/`; // Assuming /api/v1/formas-pago/

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Fetches all FormaPago records.
   * @returns An Observable of an array of FormaPago objects.
   */
  getFormasPago(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  /**
   * Fetches a single FormaPago record by ID.
   * @param id The ID of the FormaPago.
   * @returns An Observable of a single FormaPago object.
   */
  getFormaPago(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }

  /**
   * Creates a new FormaPago record.
   * @param formaPagoData The data for the new FormaPago.
   * @returns An Observable of the created FormaPago object.
   */
  createFormaPago(formaPagoData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formaPagoData, { headers: this.getAuthHeaders() });
  }

  /**
   * Updates an existing FormaPago record.
   * @param id The ID of the FormaPago to update.
   * @param formaPagoData The updated data for the FormaPago.
   * @returns An Observable of the updated FormaPago object.
   */
  updateFormaPago(id: number, formaPagoData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, formaPagoData, { headers: this.getAuthHeaders() });
  }

  /**
   * Deletes a FormaPago record.
   * @param id The ID of the FormaPago to delete.
   * @returns An Observable indicating completion.
   */
  deleteFormaPago(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }
}
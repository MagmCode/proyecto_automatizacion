// src/app/services/asegurado.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Assuming you have an environment file

@Injectable({
  providedIn: 'root'
})
export class AseguradoService {
  private apiUrl = `${environment.apiUrl}asegurados/`; // Assuming /api/v1/asegurados/

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Fetches all Asegurado records.
   * @returns An Observable of an array of Asegurado objects.
   */
  getAsegurados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  /**
   * Fetches a single Asegurado record by ID.
   * @param id The ID of the Asegurado.
   * @returns An Observable of a single Asegurado object.
   */
  getAsegurado(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }

  /**
   * Creates a new Asegurado record.
   * @param aseguradoData The data for the new Asegurado.
   * @returns An Observable of the created Asegurado object.
   */
  createAsegurado(aseguradoData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, aseguradoData, { headers: this.getAuthHeaders() });
  }

  /**
   * Updates an existing Asegurado record.
   * @param id The ID of the Asegurado to update.
   * @param aseguradoData The updated data for the Asegurado.
   * @returns An Observable of the updated Asegurado object.
   */
  updateAsegurado(id: number, aseguradoData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, aseguradoData, { headers: this.getAuthHeaders() });
  }

  /**
   * Deletes an Asegurado record.
   * @param id The ID of the Asegurado to delete.
   * @returns An Observable indicating completion.
   */
  deleteAsegurado(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }
}
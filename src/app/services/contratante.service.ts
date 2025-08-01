// src/app/services/contratante.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Assuming you have an environment file

@Injectable({
  providedIn: 'root'
})
export class ContratanteService {
  private apiUrl = `${environment.apiUrl}/contratantes/`; // Assuming /api/v1/contratantes/

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Fetches all Contratante records.
   * @returns An Observable of an array of Contratante objects.
   */
  getContratantes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  /**
   * Fetches a single Contratante record by ID.
   * @param id The ID of the Contratante.
   * @returns An Observable of a single Contratante object.
   */
  getContratante(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }

  /**
   * Creates a new Contratante record.
   * @param contratanteData The data for the new Contratante.
   * @returns An Observable of the created Contratante object.
   */
  createContratante(contratanteData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contratanteData, { headers: this.getAuthHeaders() });
  }

  /**
   * Updates an existing Contratante record.
   * @param id The ID of the Contratante to update.
   * @param contratanteData The updated data for the Contratante.
   * @returns An Observable of the updated Contratante object.
   */
  updateContratante(id: number, contratanteData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, contratanteData, { headers: this.getAuthHeaders() });
  }

  /**
   * Deletes a Contratante record.
   * @param id The ID of the Contratante to delete.
   * @returns An Observable indicating completion.
   */
  deleteContratante(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }
}
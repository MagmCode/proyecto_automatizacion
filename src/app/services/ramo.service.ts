// src/app/services/ramo.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Assuming you have an environment file

@Injectable({
  providedIn: 'root'
})
export class RamoService {
  // Replace with your actual API base URL.
  // Using environment.apiUrl is a good practice for production deployments.
  private apiUrl = `${environment.apiUrl}/ramos/`; // Assuming /api/v1/ramos/

  constructor(private http: HttpClient) { }

  // Helper to get authentication headers (assuming JWT tokens)
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); // Get your JWT token from local storage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Fetches all Ramo records from the API.
   * @returns An Observable of an array of Ramo objects.
   */
  getRamos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  /**
   * Fetches a single Ramo record by its ID.
   * @param id The ID of the Ramo.
   * @returns An Observable of a single Ramo object.
   */
  getRamo(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }

  /**
   * Creates a new Ramo record.
   * @param ramoData The data for the new Ramo.
   * @returns An Observable of the created Ramo object.
   */
  createRamo(ramoData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ramoData, { headers: this.getAuthHeaders() });
  }

  /**
   * Updates an existing Ramo record.
   * @param id The ID of the Ramo to update.
   * @param ramoData The updated data for the Ramo.
   * @returns An Observable of the updated Ramo object.
   */
  updateRamo(id: number, ramoData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, ramoData, { headers: this.getAuthHeaders() });
  }

  /**
   * Deletes a Ramo record.
   * @param id The ID of the Ramo to delete.
   * @returns An Observable indicating completion.
   */
  deleteRamo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }
}
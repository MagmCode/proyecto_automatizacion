// src/app/services/poliza.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Importa la configuración del entorno

@Injectable({
  providedIn: 'root'
})
export class PolizaService {
  // Define la URL base de tu API utilizando la variable de entorno
  private apiUrl = `${environment.apiUrl}polizas/`;

  // Define la URL específica para las pólizas próximas a vencer
  private proximaVencerUrl = `${this.apiUrl}proximas-vencer/`; // Endpoint `polizas/proximas-vencer/`

  constructor(private http: HttpClient) { }

  /**
   * Helper para obtener los encabezados de autenticación con el token JWT.
   * Asume que el token se guarda en localStorage como 'access_token' después del login.
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Formato para JWT
    });
  }

  /**
   * Obtiene todas las pólizas del backend.
   * @returns Un Observable que emite un array de objetos de póliza.
   */
  getPolizas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  /**
   * Obtiene una póliza específica por su ID.
   * @param id El ID de la póliza.
   * @returns Un Observable que emite un único objeto de póliza.
   */
  getPoliza(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }

  /**
   * Crea una nueva póliza.
   * @param polizaData Los datos de la póliza a crear.
   * @returns Un Observable que emite el objeto de póliza creado.
   */
  createPoliza(polizaData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, polizaData, { headers: this.getAuthHeaders() });
  }

  /**
   * Actualiza una póliza existente.
   * @param id El ID de la póliza a actualizar.
   * @param polizaData Los datos actualizados de la póliza.
   * @returns Un Observable que emite el objeto de póliza actualizado.
   */
  updatePoliza(id: number, polizaData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, polizaData, { headers: this.getAuthHeaders() });
  }

  /**
   * Elimina una póliza por su ID.
   * @param id El ID de la póliza a eliminar.
   * @returns Un Observable que emite una respuesta vacía al completarse.
   */
  deletePoliza(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }

  /**
   * **MODIFICACIÓN CLAVE**: Obtiene pólizas próximas a vencer filtradas por una fecha de consulta.
   * @param fecha La fecha de consulta en formato 'YYYY-MM-DD'.
   * @returns Un Observable que emite un array de objetos de póliza.
   */
  getPolizasProximasVencer(fecha: string): Observable<any[]> {
    // Construye la URL con el parámetro de consulta 'fecha'
    return this.http.get<any[]>(`${this.proximaVencerUrl}?fecha=${fecha}`, { headers: this.getAuthHeaders() });
  }
}
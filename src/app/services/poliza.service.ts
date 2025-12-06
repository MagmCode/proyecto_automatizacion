import { Injectable } from '@angular/core';
// 1. Agregamos HttpParams a los imports
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PolizaService {
  // Define la URL base para pólizas
  private apiUrl = `${environment.apiUrl}polizas/`; 
  
  // Define la URL específica para las pólizas próximas a vencer
  private proximaVencerUrl = `${this.apiUrl}proximas-vencer/`;

  // 2. Nueva URL base para los reportes (apunta a /api/v1/reportes/)
  private reportesUrl = `${environment.apiUrl}reportes/`;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // --- Métodos existentes (sin cambios) ---

  getPolizas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getPoliza(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }

  createPoliza(polizaData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, polizaData, { headers: this.getAuthHeaders() });
  }

  updatePoliza(id: number, polizaData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, polizaData, { headers: this.getAuthHeaders() });
  }

  deletePoliza(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }

   /**
   * Obtiene pólizas próximas a vencer filtradas por una fecha de consulta.
   */
  getPolizasProximasVencer(fecha: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.proximaVencerUrl}?fecha=${fecha}`, { headers: this.getAuthHeaders() });
  }

  /**
   * NUEVO: Exporta a Excel las pólizas próximas a vencer según la fecha.
   */
  exportarPolizasProximasVencerExcel(fecha: string): Observable<Blob> {
    // URL: /api/polizas/proximas-vencer/exportar/?fecha=YYYY-MM-DD
    const url = `${this.apiUrl}proximas-vencer/exportar/?fecha=${fecha}`;
    return this.http.get(url, { 
      headers: this.getAuthHeaders(),
      responseType: 'blob' 
    });
  }

  // --- NUEVOS MÉTODOS PARA REPORTES ---

  /**
   * Consulta las pólizas aplicando múltiples filtros para el reporte en pantalla.
   * @param filtros Objeto con los criterios de búsqueda (fecha, aseguradora, etc.)
   */
  getReportePolizas(filtros: any): Observable<any[]> {
    let params = new HttpParams();

    // Construimos los parámetros dinámicamente solo si tienen valor
    if (filtros.fechaDesde) params = params.set('fecha_desde', filtros.fechaDesde);
    if (filtros.fechaHasta) params = params.set('fecha_hasta', filtros.fechaHasta);
    if (filtros.aseguradora) params = params.set('aseguradora', filtros.aseguradora);
    if (filtros.contratante) params = params.set('contratante', filtros.contratante);
    if (filtros.asegurado) params = params.set('asegurado', filtros.asegurado);

    // Endpoint: /api/v1/reportes/consulta/
    return this.http.get<any[]>(`${this.reportesUrl}consulta/`, { 
      headers: this.getAuthHeaders(),
      params: params 
    });
  }

  /**
   * Descarga el reporte en formato Excel.
   * Importante: responseType: 'blob' para manejar archivos binarios.
   */
  exportarReporteExcel(filtros: any): Observable<Blob> {
    let params = new HttpParams();

    if (filtros.fechaDesde) params = params.set('fecha_desde', filtros.fechaDesde);
    if (filtros.fechaHasta) params = params.set('fecha_hasta', filtros.fechaHasta);
    if (filtros.aseguradora) params = params.set('aseguradora', filtros.aseguradora);
    if (filtros.contratante) params = params.set('contratante', filtros.contratante);
    if (filtros.asegurado) params = params.set('asegurado', filtros.asegurado);

    // Endpoint: /api/v1/reportes/exportar-excel/
    return this.http.get(`${this.reportesUrl}exportar-excel/`, {
      headers: this.getAuthHeaders(),
      params: params,
      responseType: 'blob' 
    });
  }
  
}
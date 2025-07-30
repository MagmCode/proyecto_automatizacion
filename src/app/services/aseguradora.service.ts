import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface Aseguradora {
  id: number;
  nombre: string;
  // Puedes agregar otros campos según lo que retorne tu API
}

@Injectable({
  providedIn: 'root',
})
export class AseguradoraService {
  private apiUrl = `${environment.apiUrl}/aseguradoras/`; 

  constructor(private http: HttpClient) {}

  // Obtiene la lista de aseguradoras con manejo de errores 
  getAseguradoras(): Observable<Aseguradora[]> {
    return this.http.get<Aseguradora[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error al obtener las aseguradoras:', error);
        return throwError(error);
      })
    );
  }
  
  // Método opcional para obtener una aseguradora por id
  getAseguradoraById(id: number): Observable<Aseguradora> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get<Aseguradora>(url).pipe(
      catchError(error => {
        console.error(`Error al obtener la aseguradora con id ${id}:`, error);
        return throwError(error);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export interface CartaAval {
  id: number;
  fecha_reporte: string;
  nro_siniestro: string;
  paciente: string;
  estatus: string;
}

const CARTAAVAL_DATA: CartaAval[] = [
  { id: 1, fecha_reporte: '2023-10-01', nro_siniestro: 'SN-001', paciente: 'Juan Perez', estatus: 'Pendiente' },
  { id: 2, fecha_reporte: '2023-10-02', nro_siniestro: 'SN-002', paciente: 'Maria Gomez', estatus: 'Aprobado' },
  { id: 3, fecha_reporte: '2023-10-03', nro_siniestro: 'SN-003', paciente: 'Carlos Lopez', estatus: 'Rechazado' },
  { id: 4, fecha_reporte: '2023-10-04', nro_siniestro: 'SN-004', paciente: 'Ana Rodriguez', estatus: 'Pendiente' },
  { id: 5, fecha_reporte: '2023-10-05', nro_siniestro: 'SN-005', paciente: 'Luis Martinez', estatus: 'Aprobado' },
  { id: 6, fecha_reporte: '2023-10-06', nro_siniestro: 'SN-006', paciente: 'Sofia Hernandez', estatus: 'Pendiente' },
  // Agrega más datos según sea necesario
];


@Injectable({
  providedIn: 'root'
})
export class CartaAvalService {

constructor() { }

  getCartaAval(): Observable<CartaAval[]> {
    return of(CARTAAVAL_DATA);
  }

  getCartaAvalById(id: number): Observable<CartaAval | undefined> {
    const CartaAval = CARTAAVAL_DATA.find(r => r.id === id);
    return of(CartaAval);
  }
}

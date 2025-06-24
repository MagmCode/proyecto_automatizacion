import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Reembolso {
  id: number;
  fecha_reporte: string;
  nro_siniestro: string;
  paciente: string;
  estatus: string;
}

const REEMBOLSO_DATA: Reembolso[] = [
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
export class ReembolsoService {

  constructor() { }

  getReembolsos(): Observable<Reembolso[]> {
    return of(REEMBOLSO_DATA);
  }

  getReembolsoById(id: number): Observable<Reembolso | undefined> {
    const reembolso = REEMBOLSO_DATA.find(r => r.id === id);
    return of(reembolso);
  }
}

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'fecha', 'usuario' ,'nro_siniestro', 'observaciones'];
  dataSource = new MatTableDataSource<Historial>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 5; // Mostrar solo 5 filas por página
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Remueve espacios en blanco y aplica el filtro en minúsculas
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verDetalle(id: number): void {
    this.router.navigate(['admin/historial/detalle', id]);

  }

}

export interface Historial {
  id: number;
  fecha: string;
  usuario: string;
  nro_siniestro: string;
  observaciones: string;
}

const ELEMENT_DATA: Historial[] = [
  { id: 1, fecha: '2023-10-01', usuario: 'Juan Perez', nro_siniestro: 'SN-001', observaciones: 'Pendiente' },
  { id: 2, fecha: '2023-10-02', usuario: 'Maria Gomez', nro_siniestro: 'SN-002', observaciones: 'Aprobado' },
  { id: 3, fecha: '2023-10-03', usuario: 'Carlos Lopez', nro_siniestro: 'SN-003', observaciones: 'Rechazado' },
  { id: 4, fecha: '2023-10-04', usuario: 'Ana Rodriguez', nro_siniestro: 'SN-004', observaciones: 'Pendiente' },
  { id: 5, fecha: '2023-10-05', usuario: 'Luis Martinez', nro_siniestro: 'SN-005', observaciones: 'Aprobado' },
  { id: 6, fecha: '2023-10-06', usuario: 'Sofia Hernandez', nro_siniestro: 'SN-006', observaciones: 'Pendiente' },
  { id: 7, fecha: '2023-10-06', usuario: 'Sofia Hernandez', nro_siniestro: 'SN-006', observaciones: 'Pendiente' },
  { id: 8, fecha: '2023-10-06', usuario: 'Sofia Hernandez', nro_siniestro: 'SN-006', observaciones: 'Pendiente' },
  { id: 9, fecha: '2023-10-06', usuario: 'Sofia Hernandez', nro_siniestro: 'SN-006', observaciones: 'Pendiente' },
  { id: 10, fecha: '2023-10-06', usuario: 'Sofia Hernandez', nro_siniestro: 'SN-006', observaciones: 'Pendiente' },
  { id: 11, fecha: '2023-10-06', usuario: 'Sofia Hernandez', nro_siniestro: 'SN-006', observaciones: 'Pendiente' },
  { id: 12, fecha: '2023-10-06', usuario: 'Sofia Hernandez', nro_siniestro: 'SN-006', observaciones: 'Pendiente' },
  { id: 13, fecha: '2023-10-06', usuario: 'Sofia Hernandez', nro_siniestro: 'SN-006', observaciones: 'Pendiente' },
  // Agrega más datos según sea necesario
];
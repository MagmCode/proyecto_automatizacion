
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes-admin',
  templateUrl: './reportes-admin.component.html',
  styleUrls: ['./reportes-admin.component.scss']
})
export class ReportesAdminComponent implements OnInit {

  aseguradoras: string[] = ['Seguros Caracas', 'Mapfre', 'Mercantil', 'Zurich'];
  contratantes: string[] = ['Empresa A', 'Empresa B', 'Empresa C'];
  asegurados: string[] = ['Juan Pérez', 'María Gómez', 'Carlos Ruiz'];

  displayedColumns: string[] = [
    'aseguradora', 'ramo', 'formaPago', 'nroPoliza', 'contratante', 'asegurado',
    'vigencia', 'trimestre1', 'trimestre2', 'trimestre3', 'trimestre4', 'renovacion'
  ];

  dataSource = new MatTableDataSource([
    {
      aseguradora: 'Oceania', ramo: 'PYME', formaPago: 'Semestral', nroPoliza: '505', contratante: 'grupo migo', asegurado: 'grupo migo', vigencia: '23/12/2023 - 23/12/2024', trimestre1: '23/12/2023 - 23/12/2024', trimestre2: '23/12/2023 - 23/12/2024', trimestre3: '23/12/2023 - 23/12/2024', trimestre4: '23/12/2023 - 23/12/2024', renovacion: '23/12/2024'
    },
    {
      aseguradora: 'Andina', ramo: 'Salud', formaPago: 'Anual', nroPoliza: '506', contratante: 'empresa x', asegurado: 'empresa x', vigencia: '01/01/2024 - 01/01/2025', trimestre1: '01/01/2024 - 31/03/2024', trimestre2: '01/04/2024 - 30/06/2024', trimestre3: '01/07/2024 - 30/09/2024', trimestre4: '01/10/2024 - 01/01/2025', renovacion: '01/01/2025'
    }
    // ...puedes agregar más datos de ejemplo si lo deseas
  ]);

  constructor() { }

  ngOnInit(): void {
  }

}

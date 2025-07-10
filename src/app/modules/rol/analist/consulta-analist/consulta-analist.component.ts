import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-analist',
  templateUrl: './consulta-analist.component.html',
  styleUrls: ['./consulta-analist.component.scss']
})
export class ConsultaAnalistComponent implements OnInit, AfterViewInit {

  today: Date = new Date();
  tabIndex = 0;

  displayedColumns: string[] = [
    'aseguradora', 'ramo', 'formaPago', 'nroPoliza', 'contratante', 'asegurado',
    'vigencia', 'trimestre1', 'trimestre2', 'trimestre3', 'trimestre4', 'renovacion'
  ];

  dataSource = new MatTableDataSource([
    {
      aseguradora: 'Oceania',
      ramo: 'PYME',
      formaPago: 'Semestral',
      nroPoliza: '505',
      contratante: 'grupo migo',
      asegurado: 'grupo migo',
      vigencia: '23/12/2023 - 23/12/2024',
      trimestre1: '23/12/2023 - 23/12/2024',
      trimestre2: '23/12/2023 - 23/12/2024',
      trimestre3: '23/12/2023 - 23/12/2024',
      trimestre4: '23/12/2023 - 23/12/2024',
      renovacion: '23/12/2024'
    },
    {
      aseguradora: 'Andina',
      ramo: 'Salud',
      formaPago: 'Anual',
      nroPoliza: '506',
      contratante: 'empresa x',
      asegurado: 'empresa x',
      vigencia: '01/01/2024 - 01/01/2025',
      trimestre1: '01/01/2024 - 31/03/2024',
      trimestre2: '01/04/2024 - 30/06/2024',
      trimestre3: '01/07/2024 - 30/09/2024',
      trimestre4: '01/10/2024 - 01/01/2025',
      renovacion: '01/01/2025'
    },
    {
      aseguradora: 'Mapfre',
      ramo: 'Vida',
      formaPago: 'Mensual',
      nroPoliza: '507',
      contratante: 'familia perez',
      asegurado: 'juan perez',
      vigencia: '15/02/2024 - 15/02/2025',
      trimestre1: '15/02/2024 - 15/05/2024',
      trimestre2: '16/05/2024 - 15/08/2024',
      trimestre3: '16/08/2024 - 15/11/2024',
      trimestre4: '16/11/2024 - 15/02/2025',
      renovacion: '15/02/2025'
    },
    {
      aseguradora: 'Seguros Caracas',
      ramo: 'Auto',
      formaPago: 'Trimestral',
      nroPoliza: '508',
      contratante: 'carlos ruiz',
      asegurado: 'carlos ruiz',
      vigencia: '10/03/2024 - 10/03/2025',
      trimestre1: '10/03/2024 - 10/06/2024',
      trimestre2: '11/06/2024 - 10/09/2024',
      trimestre3: '11/09/2024 - 10/12/2024',
      trimestre4: '11/12/2024 - 10/03/2025',
      renovacion: '10/03/2025'
    },
    {
      aseguradora: 'Mercantil',
      ramo: 'Hogar',
      formaPago: 'Semestral',
      nroPoliza: '509',
      contratante: 'maria lopez',
      asegurado: 'maria lopez',
      vigencia: '20/04/2024 - 20/04/2025',
      trimestre1: '20/04/2024 - 20/07/2024',
      trimestre2: '21/07/2024 - 20/10/2024',
      trimestre3: '21/10/2024 - 20/01/2025',
      trimestre4: '21/01/2025 - 20/04/2025',
      renovacion: '20/04/2025'
    },
    {
      aseguradora: 'Oceania',
      ramo: 'PYME',
      formaPago: 'Semestral',
      nroPoliza: '510',
      contratante: 'grupo migo',
      asegurado: 'grupo migo',
      vigencia: '23/12/2023 - 23/12/2024',
      trimestre1: '23/12/2023 - 23/12/2024',
      trimestre2: '23/12/2023 - 23/12/2024',
      trimestre3: '23/12/2023 - 23/12/2024',
      trimestre4: '23/12/2023 - 23/12/2024',
      renovacion: '23/12/2024'
    },
    {
      aseguradora: 'Andina',
      ramo: 'Salud',
      formaPago: 'Anual',
      nroPoliza: '511',
      contratante: 'empresa y',
      asegurado: 'empresa y',
      vigencia: '01/01/2024 - 01/01/2025',
      trimestre1: '01/01/2024 - 31/03/2024',
      trimestre2: '01/04/2024 - 30/06/2024',
      trimestre3: '01/07/2024 - 30/09/2024',
      trimestre4: '01/10/2024 - 01/01/2025',
      renovacion: '01/01/2025'
    },
    {
      aseguradora: 'Mapfre',
      ramo: 'Vida',
      formaPago: 'Mensual',
      nroPoliza: '512',
      contratante: 'familia gomez',
      asegurado: 'ana gomez',
      vigencia: '15/02/2024 - 15/02/2025',
      trimestre1: '15/02/2024 - 15/05/2024',
      trimestre2: '16/05/2024 - 15/08/2024',
      trimestre3: '16/08/2024 - 15/11/2024',
      trimestre4: '16/11/2024 - 15/02/2025',
      renovacion: '15/02/2025'
    },
    {
      aseguradora: 'Seguros Caracas',
      ramo: 'Auto',
      formaPago: 'Trimestral',
      nroPoliza: '513',
      contratante: 'laura diaz',
      asegurado: 'laura diaz',
      vigencia: '10/03/2024 - 10/03/2025',
      trimestre1: '10/03/2024 - 10/06/2024',
      trimestre2: '11/06/2024 - 10/09/2024',
      trimestre3: '11/09/2024 - 10/12/2024',
      trimestre4: '11/12/2024 - 10/03/2025',
      renovacion: '10/03/2025'
    },
    {
      aseguradora: 'Mercantil',
      ramo: 'Hogar',
      formaPago: 'Semestral',
      nroPoliza: '514',
      contratante: 'jose martinez',
      asegurado: 'jose martinez',
      vigencia: '20/04/2024 - 20/04/2025',
      trimestre1: '20/04/2024 - 20/07/2024',
      trimestre2: '21/07/2024 - 20/10/2024',
      trimestre3: '21/10/2024 - 20/01/2025',
      trimestre4: '21/01/2025 - 20/04/2025',
      renovacion: '20/04/2025'
    }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 5;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterEvent(event: Event) {
    const input = event.target as HTMLInputElement;
    this.applyFilter(input.value);
  }

  exportarTabla() {
    // Implementa aquí la lógica de exportar (ejemplo: CSV/Excel)
    alert('Funcionalidad de exportar pendiente de implementar.');
  }

  consultar() {
    this.tabIndex = 1;
  }

  salir(): void {
    this._router.navigate(['/analist/home-page']);
  }
}

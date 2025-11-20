
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AseguradoraService, Aseguradora } from 'src/app/services/aseguradora.service';
import { ContratanteService } from 'src/app/services/contratante.service';
import { AseguradoService } from 'src/app/services/asegurado.service';

@Component({
  selector: 'app-reportes-admin',
  templateUrl: './reportes-admin.component.html',
  styleUrls: ['./reportes-admin.component.scss']
})
export class ReportesAdminComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // We'll store simple name arrays so the template doesn't need to change
  aseguradoras: string[] = [];
  contratantes: string[] = [];
  asegurados: string[] = [];
  // Selected values for the selects. Initialize to empty string so the
  // template can show a default "Seleccione" option until the user picks one.
  selectedAseguradora: string = '';
  selectedContratante: string = '';
  selectedAsegurado: string = '';

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

  // Date controls for the search form. Preselect today for both fields and
  // expose a maxDate so the "Fecha Hasta" picker cannot select future dates.
  fechaDesde: Date = new Date();
  fechaHasta: Date = new Date();
  maxDate: Date = new Date();



  constructor(
    private aseguradoraService: AseguradoraService,
    private contratanteService: ContratanteService,
    private aseguradoService: AseguradoService
  ) { }

  ngOnInit(): void {
    // Fetch aseguradoras
    this.aseguradoraService.getAseguradoras().subscribe({
      next: (res) => {
        // map to name strings; if the API returns objects with `nombre` use that, otherwise fall back
        this.aseguradoras = res.map((a: any) => a.nombre ?? a.name ?? String(a));
      },
      error: (err) => console.error('Error cargando aseguradoras:', err)
    });

    // Fetch contratantes
    this.contratanteService.getContratantes().subscribe({
      next: (res) => {
        this.contratantes = res.map((c: any) => c.nombre ?? c.razon_social ?? c.name ?? String(c));
      },
      error: (err) => console.error('Error cargando contratantes:', err)
    });

    // Fetch asegurados
    this.aseguradoService.getAsegurados().subscribe({
      next: (res) => {
        this.asegurados = res.map((s: any) => s.nombre ?? `${s.primer_nombre ?? ''} ${s.apellido ?? ''}`.trim() ?? s.name ?? String(s));
      },
      error: (err) => console.error('Error cargando asegurados:', err)
    });
  }

  ngAfterViewInit(): void {
    // Wire up paginator for the table
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

}


import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PolizaService } from 'src/app/services/poliza.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common'; // Already imported, good!

// --- New Imports ---
// You'll need to import the services for Aseguradora, Ramo, Contratante, Asegurado, FormaPago
// to fetch their lists for dropdowns in your dialog.
import { AseguradoraService } from 'src/app/services/aseguradora.service'; // Assuming these exist
import { RamoService } from 'src/app/services/ramo.service';
import { ContratanteService } from 'src/app/services/contratante.service';
import { AseguradoService } from 'src/app/services/asegurado.service';
import { FormaPagoService } from 'src/app/services/forma-pago.service';
// --- End New Imports ---

@Component({
  selector: 'app-consulta-analist',
  templateUrl: './consulta-analist.component.html',
  styleUrls: ['./consulta-analist.component.scss']
})
export class ConsultaAnalistComponent implements OnInit, AfterViewInit {
  today: Date = new Date();
  selectedDate: Date = new Date();
  tabIndex = 0;
  isLoading = false;

  displayedColumns: string[] = [
    'aseguradora', 'ramo', 'formaPago', 'nroPoliza', 'contratante', 'asegurado',
    'vigencia', 'trimestre1', 'trimestre2', 'trimestre3', 'trimestre4', 'primaTotal', 'renovacion'
  ];

  dataSource = new MatTableDataSource<any>([]); // Initialize as empty, data will be loaded

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('agregarDialog') agregarDialog!: TemplateRef<any>;
  

  // --- New Properties for Dialog Dropdowns ---
  // These will hold the lists of options for your select/dropdown fields
  aseguradoras: any[] = [];
  ramos: any[] = [];
  contratantes: any[] = []; // Only if you want to select existing ones
  asegurados: any[] = [];     // Only if you want to select existing ones
  formasPago: any[] = [];
  // --- End New Properties ---


  constructor(
    private _router: Router,
    private dialog: MatDialog,
    private polizaService: PolizaService,
    private snackBar: MatSnackBar,
    // --- New Service Injections ---
    private aseguradoraService: AseguradoraService,
    private ramoService: RamoService,
    private contratanteService: ContratanteService,
    private aseguradoService: AseguradoService,
    private formaPagoService: FormaPagoService
    // --- End New Service Injections ---
  ) { }

  ngOnInit(): void {
    // Only load polizas automatically if the current tab is the Resultado tab (index 1).
    // This avoids populating the table on page reload when the user lands on the Consulta tab.
    if (this.tabIndex === 1) {
      this.loadPolizas();
    }
    // --- Load options for dropdowns ---
    this.loadAseguradoras();
    this.loadRamos();
    this.loadFormasPago();
    // You might also want to load contratantes/asegurados if you intend
    // to allow selecting existing ones rather than always creating new ones.
    // If always creating new, no need to load these lists here.
    // this.loadContratantes();
    // this.loadAsegurados();
    // --- End Load options ---
  }

  ngAfterViewInit() {
    if (this.paginator) { // Added null check for paginator
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.pageSize = 5;
    }
  }

  /**
   * Handler for tab changes. When leaving the "Resultado" tab (index 1)
   * we clear any cached results to free memory and avoid showing stale data.
   */
  onTabChange(newIndex: number): void {
    this.tabIndex = newIndex;
    // Resultado tab index is 1 in the template
    if (newIndex !== 1) {
      this.clearResultadoCache();
    }
  }

  /**
   * Clears the table data, filter, resets paginator and stops loading.
   */
  clearResultadoCache(): void {
    // Clear data shown in the table
    this.dataSource.data = [];
    // Clear any active filter
    this.dataSource.filter = '';
    // Reset paginator to first page when present
    if (this.paginator) {
      try { this.paginator.firstPage(); } catch (e) { /* ignore if not ready */ }
    }
    // Stop any loading flag in case a request was left hanging
    this.isLoading = false;
  }

  // --- New Methods to Load Dropdown Data ---
  loadAseguradoras(): void {
    this.aseguradoraService.getAseguradoras().subscribe(data => {
      this.aseguradoras = data;
    });
  }

  loadRamos(): void {
    this.ramoService.getRamos().subscribe(data => {
      this.ramos = data;
    });
  }

  loadFormasPago(): void {
    this.formaPagoService.getFormasPago().subscribe(data => {
      this.formasPago = data;
    });
  }
  // If you decide to allow selection of existing Contratantes/Asegurados:
  // loadContratantes(): void {
  //   this.contratanteService.getContratantes().subscribe(data => {
  //     this.contratantes = data;
  //   });
  // }
  // loadAsegurados(): void {
  //   this.aseguradoService.getAsegurados().subscribe(data => {
  //     this.asegurados = data;
  //   });
  // }
  // --- End New Methods ---


  loadPolizas(): void {
    this.isLoading = true;
    this.polizaService.getPolizas().subscribe({
      next: (polizas) => {
        const formatted = polizas.map(p => this.formatPolizaData(p));
        // Ordenar por id ascendente
        formatted.sort((a, b) => a.id - b.id);
        this.dataSource.data = formatted;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando pólizas:', error);
        this.snackBar.open('Error al cargar pólizas', 'Cerrar', { duration: 3000 });
        this.isLoading = false;
      }
    })
  }

// En src/app/components/consulta-admin/consulta-admin.component.ts

private formatPolizaData(poliza: any): any {
  return {
    id: poliza.id,
    
    // Accede al nombre desde el objeto anidado `aseguradora_nombre`
    aseguradora: poliza.aseguradora_nombre.nombre,
    // Accede al ID para poder preseleccionar el dropdown en la edición
    aseguradoraId: poliza.aseguradora_nombre.id,

    // Accede al nombre desde el objeto anidado `ramo_nombre`
    ramo: poliza.ramo_nombre.nombre,
    // Accede al ID para la edición
    ramoId: poliza.ramo_nombre.id,

    // `forma_pago_nombre` es una cadena (string) directamente
    formaPago: poliza.forma_pago_nombre,
    // Nota: El ID para `formaPago` deberá ser enviado por el backend
    // a través de un campo como `forma_pago_id` en el serializador si lo necesitas.
    // Por ahora, se asume que tu serializador de backend ya lo envía.
    formaPagoId: poliza.forma_pago_id,

    nroPoliza: poliza.numero,
    
    // Los campos `contratante` y `asegurado` son objetos anidados,
    // por lo que el acceso a `.nombre` y el resto de los datos es directo.
    contratante: poliza.contratante.nombre,
    contratanteData: poliza.contratante,
    asegurado: poliza.asegurado.nombre,
    aseguradoData: poliza.asegurado,

    // Formatea y mapea el resto de los campos de la póliza
    vigencia: `${formatDate(poliza.fecha_inicio, 'dd/MM/yyyy', 'en-US')} - ${formatDate(poliza.fecha_fin, 'dd/MM/yyyy', 'en-US')}`,
    fecha_inicio: poliza.fecha_inicio,
    fecha_fin: poliza.fecha_fin,
    trimestre1: poliza.i_trimestre,
    trimestre2: poliza.ii_trimestre,
    trimestre3: poliza.iii_trimestre,
    trimestre4: poliza.iv_trimestre,
    renovacion: poliza.renovacion,
    primaTotal: poliza.prima_total,
    observaciones: poliza.observaciones,
  };
}

  // Changed to reflect direct number input for trimestres
  private formatTrimestre(fechaInicio: string, trimestre: number): string {
    return `${formatDate(fechaInicio, 'dd/MM/yyyy', 'es-US')} - ${trimestre}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterEvent(event: Event) {
    const input = event.target as HTMLInputElement;
    this.applyFilter(input.value);
  }

exportarTabla() {
    this.isLoading = true; // Mostrar loading mientras descarga
    this.snackBar.open('Generando Excel...', '', { duration: 1000 });

    const fechaConsulta = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US');

    this.polizaService.exportarPolizasProximasVencerExcel(fechaConsulta).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        // Nombre del archivo ej: ProximasVencer_2025-08-01.xlsx
        a.download = `ProximasVencer_${fechaConsulta}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        this.isLoading = false;
        this.snackBar.open('Excel descargado correctamente', 'Cerrar', { duration: 3000 });
      },
      error: (error) => {
        console.error('Error exportando:', error);
        this.isLoading = false;
        this.snackBar.open('Error al generar el Excel', 'Cerrar', { duration: 3000 });
      }
    });
  }


 consultar() {
    this.tabIndex = 1;
    // This `this.today` is the date from your date picker.
    const fechaConsulta = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US'); // e.g., "2025-08-01"
    this.isLoading = true;

    this.polizaService.getPolizasProximasVencer(fechaConsulta).subscribe({
      next: (polizas) => {
        const formatted = polizas.map(p => this.formatPolizaData(p));
        formatted.sort((a, b) => a.id - b.id);
        this.dataSource.data = formatted;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando pólizas próximas a vencer:', error);
        this.snackBar.open('Error al cargar pólizas', 'Cerrar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }


  salir(): void {
    this._router.navigate(['/analist/home-page']);
  }
}
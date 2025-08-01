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
  selector: 'app-consulta-admin',
  templateUrl: './consulta-admin.component.html',
  styleUrls: ['./consulta-admin.component.scss']
})
export class ConsultaAdminComponent implements OnInit, AfterViewInit {

  today: Date = new Date();
  tabIndex = 0;
  isLoading = false;

  displayedColumns: string[] = [
    'aseguradora', 'ramo', 'formaPago', 'nroPoliza', 'contratante', 'asegurado',
    'vigencia', 'trimestre1', 'trimestre2', 'trimestre3', 'trimestre4', 'renovacion', 'acciones'
  ];

  dataSource = new MatTableDataSource<any>([]); // Initialize as empty, data will be loaded

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('editarDialog') editarDialog!: TemplateRef<any>;

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
    this.loadPolizas();
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
        this.dataSource.data = polizas.map(p => this.formatPolizaData(p));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando pólizas:', error);
        this.snackBar.open('Error al cargar pólizas', 'Cerrar', { duration: 3000 });
        this.isLoading = false;
      }
    })
  }

  private formatPolizaData(poliza: any): any {
    return {
      id: poliza.id,
      aseguradora: poliza.aseguradora.nombre,
      aseguradoraId: poliza.aseguradora.id, // <-- Added for edit dialog pre-selection
      ramo: poliza.ramo.nombre,
      ramoId: poliza.ramo.id,             // <-- Added for edit dialog pre-selection
      formaPago: poliza.forma_pago, // forma_pago is directly the string name from StringRelatedField
      formaPagoId: poliza.forma_pago_id, // <-- Added for edit dialog pre-selection (assuming backend sends this too, if not, adjust)
      nroPoliza: poliza.numero,
      contratante: poliza.contratante.nombre,
      contratanteData: poliza.contratante, // <-- Keep the full nested object for editing
      asegurado: poliza.asegurado.nombre,
      aseguradoData: poliza.asegurado,     // <-- Keep the full nested object for editing
      vigencia: `${formatDate(poliza.fecha_inicio, 'dd/MM/yyyy', 'en-US')} - ${formatDate(poliza.fecha_fin, 'dd/MM/yyyy', 'en-US')}`,
      fecha_inicio: poliza.fecha_inicio, // <-- Added for correct date parsing in update/create
      fecha_fin: poliza.fecha_fin,       // <-- Added for correct date parsing in update/create
      trimestre1: poliza.i_trimestre, // Direct number now, not string with date
      trimestre2: poliza.ii_trimestre,
      trimestre3: poliza.iii_trimestre,
      trimestre4: poliza.iv_trimestre,
      renovacion: poliza.renovacion,
      montoAsegurado: poliza.monto_asegurado, // <-- Added to map model fields
      primaTotal: poliza.prima_total,         // <-- Added to map model fields
      observaciones: poliza.observaciones,    // <-- Added to map model fields
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
    alert('Funcionalidad de exportar pendiente de implementar.');
  }

  editarElemento(element: any) {
    // Open the dialog with a copy of the element, including full nested data
    const dialogRef = this.dialog.open(this.editarDialog, {
      width: '800px',
      data: {
        ...element,
        // Ensure nested objects are copied for modification without altering original
        contratanteData: { ...element.contratanteData },
        aseguradoData: { ...element.aseguradoData }
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.updatePoliza(result);
      }
    });
  }

  agregarRegistro() {
    // --- Modified 'nuevo' object for new record creation ---
    // Now initializes with empty nested objects for Contratante/Asegurado
    const nuevo: any = {
      id: null, // New records don't have an ID yet
      nroPoliza: '',
      aseguradoraId: null, // Will be selected from dropdown
      ramoId: null,      // Will be selected from dropdown
      formaPagoId: null, // Will be selected from dropdown
      contratanteData: { // All required fields for Contratante must be here
        nombre: '',
        documento: '',
        telefono: '',
        email: '',
        direccion: '',
        // Add other required Contratante fields here if your model has them
      },
      aseguradoData: {   // All required fields for Asegurado must be here
        nombre: '',
        documento: '',
        telefono: '',
        email: '',
        direccion: '',
        // Add other required Asegurado fields here if your model has them
      },
      fecha_inicio: '', // Dates will be from date pickers
      fecha_fin: '',
      vigencia: '', // String representation for display, actual dates sent separately
      trimestre1: null, // Use null for numbers
      trimestre2: null,
      trimestre3: null,
      trimestre4: null,
      renovacion: '',
      montoAsegurado: null,
      primaTotal: null,
      observaciones: ''
    };
    // --- End Modified 'nuevo' object ---

    const dialogRef = this.dialog.open(this.editarDialog, {
      width: '800px',
      data: { ...nuevo }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.createPoliza(result);
      }
    });
  }

  createPoliza(polizaData: any) {
    // --- Modified transformation for nested writable serializers ---
    const polizaToCreate = {
      numero: polizaData.nroPoliza,
      // Send IDs for these relationships
      aseguradora: polizaData.aseguradoraId, // Send ID, not nested object
      ramo: polizaData.ramoId,               // Send ID
      forma_pago: polizaData.formaPagoId,     // Send ID
      // Send full nested objects for Contratante and Asegurado
      contratante: polizaData.contratanteData, // Use the full data object
      asegurado: polizaData.aseguradoData,     // Use the full data object
      // Ensure dates are formatted correctly for backend (YYYY-MM-DD)
      fecha_inicio: formatDate(new Date(polizaData.fecha_inicio), 'yyyy-MM-dd', 'en-US'),
      fecha_fin: formatDate(new Date(polizaData.fecha_fin), 'yyyy-MM-dd', 'en-US'),
      // Convert to numbers for DecimalField
      i_trimestre: parseFloat(polizaData.trimestre1),
      ii_trimestre: parseFloat(polizaData.trimestre2),
      iii_trimestre: parseFloat(polizaData.trimestre3),
      iv_trimestre: parseFloat(polizaData.trimestre4),
      renovacion: polizaData.renovacion,
      monto_asegurado: parseFloat(polizaData.montoAsegurado),
      prima_total: parseFloat(polizaData.primaTotal),
      observaciones: polizaData.observaciones
    };
    // --- End Modified transformation ---

    this.polizaService.createPoliza(polizaToCreate).subscribe({
      next: (response) => {
        this.snackBar.open('Póliza creada exitosamente', 'Cerrar', { duration: 3000 });
        this.loadPolizas();
      },
      error: (error) => {
        console.error('Error al crear póliza:', error);
        this.snackBar.open(`Error al crear póliza: ${JSON.stringify(error.error)}`, 'Cerrar', { duration: 5000 }); // Show backend errors
      }
    });
  }

  updatePoliza(polizaData: any) {
    // --- Modified transformation for nested writable serializers ---
    const polizaToUpdate = {
      id: polizaData.id,
      numero: polizaData.nroPoliza,
      // Send IDs for these relationships
      aseguradora: polizaData.aseguradoraId,
      ramo: polizaData.ramoId,
      forma_pago: polizaData.formaPagoId,
      // Send full nested objects for Contratante and Asegurado
      contratante: polizaData.contratanteData,
      asegurado: polizaData.aseguradoData,
      // Ensure dates are formatted correctly for backend (YYYY-MM-DD)
      fecha_inicio: formatDate(new Date(polizaData.fecha_inicio), 'yyyy-MM-dd', 'en-US'),
      fecha_fin: formatDate(new Date(polizaData.fecha_fin), 'yyyy-MM-dd', 'en-US'),
      // Convert to numbers for DecimalField
      i_trimestre: parseFloat(polizaData.trimestre1),
      ii_trimestre: parseFloat(polizaData.trimestre2),
      iii_trimestre: parseFloat(polizaData.trimestre3),
      iv_trimestre: parseFloat(polizaData.trimestre4),
      renovacion: polizaData.renovacion,
      monto_asegurado: parseFloat(polizaData.montoAsegurado),
      prima_total: parseFloat(polizaData.primaTotal),
      observaciones: polizaData.observaciones
    };
    // --- End Modified transformation ---

    this.polizaService.updatePoliza(polizaData.id, polizaToUpdate).subscribe({
      next: (response) => {
        this.snackBar.open('Póliza actualizada exitosamente', 'Cerrar', { duration: 3000 });
        this.loadPolizas();
      },
      error: (error) => {
        console.error('Error al actualizar póliza:', error);
        this.snackBar.open(`Error al actualizar póliza: ${JSON.stringify(error.error)}`, 'Cerrar', { duration: 5000 }); // Show backend errors
      }
    });
  }

  eliminarElemento(element: any) {
    if (confirm('¿Seguro que desea eliminar esta póliza?')) {
      this.polizaService.deletePoliza(element.id).subscribe({
        next: () => {
          this.snackBar.open('Póliza eliminada exitosamente', 'Cerrar', { duration: 3000 });
          this.loadPolizas();
        },
        error: (error) => {
          console.error('Error al eliminar póliza:', error);
          this.snackBar.open('Error al eliminar póliza', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  consultar() {
    this.tabIndex = 1;
    const fechaConsulta = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
    this.isLoading = true;

    // --- Clarification on `consultar()` ---
    // This method correctly calls `getPolizasProximasVencer`.
    // If you intend for the "Consulta" tab to be a general search/list for ALL policies
    // (not just those nearing expiry), you would call `this.polizaService.getPolizas()` here,
    // and potentially add more filtering parameters to that call.
    // For now, it remains specific to "Pólizas Próximas a Vencer".
    // --- End Clarification ---

    this.polizaService.getPolizasProximasVencer(fechaConsulta).subscribe({
      next: (polizas) => {
        this.dataSource.data = polizas.map(p => this.formatPolizaData(p));
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
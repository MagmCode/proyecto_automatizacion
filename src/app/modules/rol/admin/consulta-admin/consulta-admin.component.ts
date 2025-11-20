
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
  selectedDate: Date = new Date();
  tabIndex = 0;
  isLoading = false;

  displayedColumns: string[] = [
    'acciones', 'aseguradora', 'ramo', 'formaPago', 'nroPoliza', 'contratante', 'asegurado',
    'vigencia', 'trimestre1', 'trimestre2', 'trimestre3', 'trimestre4', 'primaTotal', 'montoAsegurado', 'renovacion'
  ];

  dataSource = new MatTableDataSource<any>([]); // Initialize as empty, data will be loaded

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('editarDialog') editarDialog!: TemplateRef<any>;
  @ViewChild('agregarDialog') agregarDialog!: TemplateRef<any>;
  @ViewChild('verDialog') verDialog!: TemplateRef<any>;
  verElemento(element: any) {
    const dialogData = {
      ...element,
      contratanteData: element.contratanteData || element.contratante,
      aseguradoData: element.aseguradoData || element.asegurado
    };
    this.dialog.open(this.verDialog, {
      width: '800px',
      data: dialogData
    });
  }

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
    montoAsegurado: poliza.monto_asegurado,
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
    alert('Funcionalidad de exportar pendiente de implementar.');
  }

  editarElemento(element: any) {
    // Busca el id de la forma de pago por nombre si no viene en el objeto
    const formaPagoId = element.formaPagoId
      ?? element.forma_pago_id
      ?? this.formasPago.find(fp => fp.nombre === element.formaPago)?.id
      ?? null;

    // Convertir fechas string a objetos Date locales para evitar desfase por zona horaria
    const parseDate = (val: any) => {
      if (!val) return null;
      if (val instanceof Date) return val;
      // Si es string tipo 'YYYY-MM-DD', parsear manualmente a Date local
      if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
        const [year, month, day] = val.split('-').map(Number);
        return new Date(year, month - 1, day);
      }
      // Si es string tipo 'YYYY-MM-DDTHH:mm:ss', usar Date normal
      const d = new Date(val);
      return isNaN(d.getTime()) ? null : d;
    };

    const dialogData = {
      ...element,
      fecha_inicio: parseDate(element.fecha_inicio),
      fecha_fin: parseDate(element.fecha_fin),
      renovacion: parseDate(element.renovacion),
      contratanteData: { ...element.contratanteData },
      aseguradoData: { ...element.aseguradoData },
      formaPagoId
    };
    console.log('Datos enviados al diálogo de editar:', dialogData);
    const dialogRef = this.dialog.open(this.editarDialog, {
      width: '800px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.updatePoliza(result);
      }
    });
  }

  agregarRegistro() {
    // Estructura compatible con el stepper y el template HTML
    const nuevo: any = {
      numero: '',
      aseguradora_id: null,
      ramo_id: null,
      forma_pago_id: null,
      fecha_inicio: '',
      fecha_fin: '',
      renovacion: '',
      prima_total: null,
      monto_asegurado: null,
      contratante: {
        nombre: '',
        documento: '',
        telefono: '',
        email: '',
        direccion: ''
      },
      asegurado: {
        nombre: '',
        documento: '',
        telefono: '',
        email: '',
        direccion: ''
      }
    };

    const dialogRef = this.dialog.open(this.agregarDialog, {
      width: '800px',
      data: {
        ...nuevo,
        aseguradoras: this.aseguradoras,
        ramos: this.ramos,
        formasPago: this.formasPago
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.createPoliza(result);
      }
    });
  }


createPoliza(polizaData: any) {
  // Construir el objeto exactamente como lo espera el backend
  const polizaToCreate = {
    numero: polizaData.numero,
    fecha_inicio: formatDate(new Date(polizaData.fecha_inicio), 'yyyy-MM-dd', 'en-US'),
    fecha_fin: formatDate(new Date(polizaData.fecha_fin), 'yyyy-MM-dd', 'en-US'),
    renovacion: polizaData.renovacion ? formatDate(new Date(polizaData.renovacion), 'yyyy-MM-dd', 'en-US') : '',
    prima_total: parseFloat(polizaData.prima_total),
    aseguradora_id: polizaData.aseguradora_id,
    ramo_id: polizaData.ramo_id,
    forma_pago_id: polizaData.forma_pago_id,
    monto_asegurado: parseFloat(polizaData.monto_asegurado),
    contratante: {
      nombre: polizaData.contratante?.nombre,
      documento: polizaData.contratante?.documento,
      telefono: polizaData.contratante?.telefono,
      email: polizaData.contratante?.email,
      direccion: polizaData.contratante?.direccion
    },
    asegurado: {
      nombre: polizaData.asegurado?.nombre,
      documento: polizaData.asegurado?.documento,
      telefono: polizaData.asegurado?.telefono,
      email: polizaData.asegurado?.email,
      direccion: polizaData.asegurado?.direccion
    }
  };

  this.polizaService.createPoliza(polizaToCreate).subscribe({
    next: (response) => {
      this.snackBar.open('Póliza creada exitosamente', 'Cerrar', { duration: 3000 });
      this.loadPolizas();
    },
    error: (error) => {
      console.error('Error al crear póliza:', error);
      this.snackBar.open(`Error al crear póliza: ${JSON.stringify(error.error)}`, 'Cerrar', { duration: 5000 });
    }
  });
}

updatePoliza(polizaData: any) {
  const getPersonaObj = (main: any, backup: any) => {
    if (main && typeof main === 'object') return main;
    if (backup && typeof backup === 'object') return backup;
    return {};
  };
  const polizaToUpdate = {
    id: polizaData.id,
    numero: polizaData.nroPoliza,
    aseguradora_id: polizaData.aseguradoraId, // Usa el nombre correcto del campo del serializador
    ramo_id: polizaData.ramoId,
    forma_pago_id: polizaData.formaPagoId,
    contratante: getPersonaObj(polizaData.contratante, polizaData.contratanteData),
    asegurado: getPersonaObj(polizaData.asegurado, polizaData.aseguradoData),
    fecha_inicio: formatDate(new Date(polizaData.fecha_inicio), 'yyyy-MM-dd', 'en-US'),
    fecha_fin: formatDate(new Date(polizaData.fecha_fin), 'yyyy-MM-dd', 'en-US'),
    // --- CAMBIO CLAVE: Ya no enviamos los trimestres, solo la primaTotal ---
    prima_total: parseFloat(polizaData.primaTotal),
    // --- FIN DEL CAMBIO ---
    renovacion: polizaData.renovacion ? formatDate(new Date(polizaData.renovacion), 'yyyy-MM-dd', 'en-US') : '',
    monto_asegurado: parseFloat(polizaData.montoAsegurado),
    observaciones: polizaData.observaciones
  };

  this.polizaService.updatePoliza(polizaData.id, polizaToUpdate).subscribe({
    next: (response) => {
      this.snackBar.open('Póliza actualizada exitosamente', 'Cerrar', { duration: 3000 });
      this.loadPolizas();
    },
    error: (error) => {
      console.error('Error al actualizar póliza:', error);
      this.snackBar.open(`Error al actualizar póliza: ${JSON.stringify(error.error)}`, 'Cerrar', { duration: 5000 });
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
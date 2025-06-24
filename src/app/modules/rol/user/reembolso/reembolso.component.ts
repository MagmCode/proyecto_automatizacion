import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Reembolso, Documento } from 'src/app/models/reembolso.model';
import { AseguradoraService } from 'src/app/services/aseguradora.service';

@Component({
  selector: 'app-reembolso',
  templateUrl: './reembolso.component.html',
  styleUrls: ['./reembolso.component.scss']
})
export class ReembolsoComponent implements OnInit {
  facturaDataSource = new MatTableDataSource<Reembolso>();
  displayedColumns: string[] = [
    'acciones',
    'id',
    'nroControl',
    'fechaFactura',
    'concepto',
    'monto',
    'documentos',
    'estado'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('addFacturaDialog') addFacturaDialog!: TemplateRef<any>;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  usuario!: any;
  selectedFiles: { [key: string]: File } = {};
  aseguradoras: any[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private aseguradoraService: AseguradoraService
  ) {}

  ngOnInit(): void {
    this.loadAseguradoras();
    this.initUserData();
    this.initForms();
    this.loadReembolsos();
  }

  ngAfterViewInit(): void {
    this.facturaDataSource.paginator = this.paginator;
  }

  private loadAseguradoras(): void {
    this.aseguradoraService.getAseguradoras().subscribe(
      (data) => this.aseguradoras = data,
      (error) => console.error('Error al obtener aseguradoras:', error)
    );
  }

  private initUserData(): void {
    this.usuario = {
      nombreCompleto: this.authService.getFullName(),
      tipoCedula: this.authService.getTipoCedula(),
      cedula: this.authService.getUsername(),
      telefono: this.authService.getTelefono(),
      aseguradora: this.authService.getAseguradora(),
      nroPoliza: this.authService.getNroPoliza()
    };
  }

  private initForms(): void {
    this.firstFormGroup = this._formBuilder.group({
      id: ['', Validators.required],
      nroControl: ['', Validators.required],
      fechaFactura: ['', Validators.required],
      concepto: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(0)]]
    });

    this.secondFormGroup = this._formBuilder.group({
      informeAmplio: ['', Validators.required],
      informeEstudio: ['', Validators.required],
      docIdentificacion: ['', Validators.required]
    });
  }

  addRow(): void {
    const dialogRef = this.dialog.open(this.addFacturaDialog, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.selectedFiles = {};
      this.secondFormGroup.reset();
    });
  }

  onFileSelected(event: any, field: 'informe_ampliado' | 'informe_resultado' | 'cedula_paciente'): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[field] = file;
      
      // Mapeo para mostrar nombres en el formulario
      const fieldMapping = {
        'informe_ampliado': 'informeAmplio',
        'informe_resultado': 'informeEstudio',
        'cedula_paciente': 'docIdentificacion'
      };
      
      this.secondFormGroup.get(fieldMapping[field])?.setValue(file.name);
    }
  }

  getFileName(field: 'informe_ampliado' | 'informe_resultado' | 'cedula_paciente'): string {
    const fieldMapping = {
      'informe_ampliado': 'informeAmplio',
      'informe_resultado': 'informeEstudio',
      'cedula_paciente': 'docIdentificacion'
    };
    return this.secondFormGroup.get(fieldMapping[field])?.value || '';
  }

  guardar(): void {
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid) {
      this.mostrarNotificacion('Complete todos los campos requeridos y suba todos los documentos');
      return;
    }

    // Log para depuración
    const facturaData = this.firstFormGroup.value;
    console.log('Datos a enviar:', {
      id: facturaData.id,
      nroControl: facturaData.nroControl,
      fecha_factura: this.formatDate(new Date(facturaData.fechaFactura)),
      concepto: facturaData.concepto,
      monto: facturaData.monto,
      username: this.authService.getUsername(),
      aseguradora: this.usuario.aseguradora,
      estado: 'PENDIENTE',
      archivos: Object.keys(this.selectedFiles)
    });

    const formData = this.prepareFormData();
    
    this.authService.addReembolso(formData).subscribe({
      next: () => this.handleSaveSuccess(),
      error: (err) => this.handleSaveError(err)
    });
  }

  private prepareFormData(): FormData {
    const formData = new FormData();
    const facturaData = this.firstFormGroup.value;

    // Datos básicos
    formData.append('id', facturaData.id);
    formData.append('nroControl', facturaData.nroControl);
    formData.append('fecha_factura', this.formatDate(new Date(facturaData.fechaFactura)));
    formData.append('concepto', facturaData.concepto);
    formData.append('monto', facturaData.monto);
    formData.append('username', this.authService.getUsername());
    formData.append('aseguradora', this.usuario.aseguradora);
    formData.append('estado', 'PENDIENTE');

    // Archivos
    Object.keys(this.selectedFiles).forEach(key => {
      formData.append(key, this.selectedFiles[key]);
    });

    return formData;
  }

  private handleSaveSuccess(): void {
    this.dialog.closeAll();
    this.mostrarNotificacion('Solicitud registrada exitosamente');
    this.loadReembolsos();
    this.resetForms();
  }

  private handleSaveError(error: any): void {
    console.error('Error al guardar:', error);
    this.mostrarNotificacion('Error al registrar la solicitud: ' + (error.error?.message || error.message || 'Error desconocido'));
  }

  private resetForms(): void {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.selectedFiles = {};
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  loadReembolsos(): void {
    this.authService.getReembolsos().subscribe(
      (data: any[]) => {
        this.facturaDataSource.data = data.map(item => ({
          id: item.id,
          nroControl: item.nroControl || '---',
          fechaFactura: item.fecha_factura,
          concepto: item.concepto,
          monto: item.monto,
          estado: item.estado || 'PENDIENTE',
          username: item.username,
          documentos: this.construirDocumentos(item)
        }));
      },
      (error) => {
        console.error('Error al cargar reembolsos:', error);
        this.mostrarNotificacion('Error al cargar solicitudes');
      }
    );
  }

  private construirDocumentos(data: any): Documento[] {
    const documentos: Documento[] = [];
    
    if (data.informe_ampliado) {
      documentos.push({ nombre: 'Informe Amplio', url: data.informe_ampliado });
    }
    if (data.informe_resultado) {
      documentos.push({ nombre: 'Informe y Resultados', url: data.informe_resultado });
    }
    if (data.cedula_paciente) {
      documentos.push({ nombre: 'Documento de Identificación', url: data.cedula_paciente });
    }
    
    return documentos;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.facturaDataSource.filter = filterValue.trim().toLowerCase();
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'APROBADO': return 'estado-aprobado';
      case 'RECHAZADO': return 'estado-rechazado';
      case 'PENDIENTE': return 'estado-revision';
      default: return '';
    }
  }

  verDetalles(element: Reembolso): void {
    console.log('Detalles:', element);
  }

  mostrarNotificacion(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', { duration: 3000 });
  }

  // Getters para estadísticas
  get totalSolicitudes(): number { return this.facturaDataSource.data.length; }
  get aprobadas(): number { return this.facturaDataSource.data.filter(s => s.estado === 'APROBADO').length; }
  get enRevision(): number {
    return this.facturaDataSource.data.filter(s => s.estado?.toUpperCase() !== 'APROBADO' && s.estado?.toUpperCase() !== 'RECHAZADO').length;
  }
  get rechazadas(): number { return this.facturaDataSource.data.filter(s => s.estado === 'RECHAZADO').length; }
}
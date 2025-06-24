import { Component, ViewChild, TemplateRef, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CartaAval, Documentos } from 'src/app/models/carta-aval.model';
import { AseguradoraService } from 'src/app/services/aseguradora.service';


@Component({
  selector: 'app-carta-aval',
  templateUrl: './carta-aval.component.html',
  styleUrls: ['./carta-aval.component.scss']
})
export class CartaAvalComponent implements OnInit, AfterViewInit {
  facturaDataSource = new MatTableDataSource<CartaAval>();
  displayedColumns: string[] = [
    'id',
    'nroControl',
    'fechaFactura',
    'concepto',
    'monto',
    'documentos',
    'estado',
    'acciones'
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
    // Cargar la lista de aseguradoras desde el backend
    this.aseguradoraService.getAseguradoras().subscribe(
      (data) => {
        this.aseguradoras = data;
      },
      (error) => {
        console.error('Error al obtener las aseguradoras:', error);
      }
    );

    // Inicializar el objeto usuario – asegurándose de tener el id numérico de la aseguradora
    this.usuario = {
      nombreCompleto: this.authService.getFullName(),
      tipoCedula: this.authService.getTipoCedula(),
      cedula: this.authService.getUsername(),
      telefono: this.authService.getTelefono(),
      aseguradora: Number(this.authService.getAseguradora()),
      nroPoliza: this.authService.getNroPoliza()
    };

    // Inicializar los formularios
    this.firstFormGroup = this._formBuilder.group({
      id: ['', Validators.required],
      nroControl: ['', Validators.required],
      fechaFactura: ['', Validators.required],
      concepto: ['', Validators.required],
      monto: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      informeAmplio: [''],
      informeEstudio: [''],
      docIdentificacion: ['']
    });

    // Cargar los CartaAvals existentes desde el backend
    this.loadCartaAvals();
  }

  ngAfterViewInit(): void {
    this.facturaDataSource.paginator = this.paginator;
  }

  addRow(): void {
    const dialogRef = this.dialog.open(this.addFacturaDialog, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.selectedFiles = {}; // Limpia los archivos seleccionados al cerrar el diálogo
    });
  }

  onFileSelected(event: any, field: string): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[field] = file;
    }
  }

  guardar(): void {
    if (this.firstFormGroup.invalid) {
      this.mostrarNotificacion('Por favor, complete todos los campos requeridos.');
      return;
    }
  
    // Validación: Asegurar que se hayan subido los tres documentos
    if (
      !this.selectedFiles['informe_ampliado'] ||
      !this.selectedFiles['informe_resultado'] ||
      !this.selectedFiles['docIdentificacion']
    ) {
      if (!this.selectedFiles['informe_ampliado']) {
        this.secondFormGroup.get('informeAmplio')?.markAsTouched();
      }
      if (!this.selectedFiles['informe_resultado']) {
        this.secondFormGroup.get('informeEstudio')?.markAsTouched();
      }
      if (!this.selectedFiles['docIdentificacion']) {
        this.secondFormGroup.get('docIdentificacion')?.markAsTouched();
      }
      this.mostrarNotificacion('Debe cargar los tres documentos requeridos.');
      return;
    }
  
    const facturaData = this.firstFormGroup.value;
    const formData = new FormData();
  
    // Convertir "fechaFactura" al formato esperado y asignarla al campo "fecha_factura"
    if (facturaData.fechaFactura) {
      facturaData.fecha_factura = this.formatDate(new Date(facturaData.fechaFactura));
      delete facturaData.fechaFactura; // Para evitar duplicados
    }
  
    // Agregar los demás campos del formulario al FormData
    Object.keys(facturaData).forEach(key => {
      formData.append(key, facturaData[key]);
    });
  
    // Agregar de forma explícita los archivos, mapeando la clave "docIdentificacion" a "cedula_paciente"
    if (this.selectedFiles['informe_ampliado']) {
      formData.append('informe_ampliado', this.selectedFiles['informe_ampliado']);
    }
    if (this.selectedFiles['informe_resultado']) {
      formData.append('informe_resultado', this.selectedFiles['informe_resultado']);
    }
    if (this.selectedFiles['docIdentificacion']) {
      formData.append('cedula_paciente', this.selectedFiles['docIdentificacion']);
    }
  
    // Campos adicionales requeridos por el backend
    formData.append('username', this.usuario.cedula);
    formData.append('aseguradora', this.usuario.aseguradora.toString());
    formData.append('estado', 'En revisión');
  
    // Enviar la solicitud al backend
    this.authService.addCartaAval(formData).subscribe(
      (data: any) => {
        const nuevoCartaAval: CartaAval = {
          id: data.id,
          nroControl: data.nroControl || facturaData.nroControl,
          fechaFactura: data.fecha_factura,
          concepto: data.concepto,
          monto: data.monto,
          estado: data.estado || 'En revisión',
          username: data.username,
          documentos: this.construirDocumentos(data)
        };
  
        this.facturaDataSource.data = [...this.facturaDataSource.data, nuevoCartaAval];
        this.dialog.closeAll();
        this.firstFormGroup.reset();
        this.secondFormGroup.reset();
        this.selectedFiles = {};
        this.mostrarNotificacion('Solicitud agregada correctamente.');
      },
      (error) => {
        console.error('Error al agregar el CartaAval', error);
        this.mostrarNotificacion('Error al agregar la solicitud.');
      }
    );
  }
  

  // Función para construir el arreglo de Documentos usando los campos de archivos retornados por el backend
  private construirDocumentos(data: any): Documentos[] {
    const docs: Documentos[] = [];
    if (data.informe_ampliado) {
      docs.push({ nombre: 'Informe Amplio', url: data.informe_ampliado });
    }
    if (data.informe_resultado) {
      docs.push({ nombre: 'Informe y Resultados de Estudio', url: data.informe_resultado });
    }
    if (data.cedula_paciente) {
      docs.push({ nombre: 'Documento de Identificación', url: data.cedula_paciente });
    }
    return docs;
  }

  // Función para formatear una fecha a formato YYYY-MM-DD
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getFileName(field: string): string {
    return this.selectedFiles[field] ? this.selectedFiles[field].name : '';
  }

  // Función para obtener el nombre de la aseguradora a partir de su id
  getAseguradora(id: number): string {
    const found = this.aseguradoras.find(a => a.id === id);
    return found ? found.nombre : 'Sin Aseguradora';
  }

  deleteRow(element: CartaAval): void {
    this.facturaDataSource.data = this.facturaDataSource.data.filter(e => e !== element);
    this.mostrarNotificacion('Solicitud eliminada.');
  }

  descargarDocumentos(element: CartaAval): void {
    element.documentos.forEach((doc: Documentos) => {
      const link = document.createElement('a');
      link.href = doc.url;
      link.download = doc.nombre;
      link.click();
    });
  }

  verDetalles(element: CartaAval): void {
    console.log('Detalles del CartaAval:', element);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.facturaDataSource.filter = filterValue.trim().toLowerCase();
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'Aprobado':
        return 'estado-aprobado';
      case 'Rechazado':
        return 'estado-rechazado';
      case 'En revisión':
        return 'estado-revision';
      default:
        return '';
    }
  }

  get totalSolicitudes(): number {
    return this.facturaDataSource.data.length;
  }

  get aprobadas(): number {
    return this.facturaDataSource.data.filter(s => s.estado === 'Aprobado').length;
  }

  get enRevision(): number {
    return this.facturaDataSource.data.filter(s => s.estado === 'En revisión').length;
  }

  get rechazadas(): number {
    return this.facturaDataSource.data.filter(s => s.estado === 'Rechazado').length;
  }

  mostrarNotificacion(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
    });
  }

  loadCartaAvals(): void {
    this.authService.getCartaAval().subscribe(
      (data: any[]) => {
        this.facturaDataSource.data = data.map(item => {
          // Para cada item, asignamos defaults en caso de que falte "nroControl" o "estado"
          const CartaAval: CartaAval = {
            id: item.id,
            nroControl: item.nroControl || '---',
            fechaFactura: item.fecha_factura,
            concepto: item.concepto,
            monto: item.monto,
            estado: item.estado || 'En revisión',
            username: item.username,
            documentos: [
              { nombre: 'Informe Amplio', url: item.informe_ampliado },
              { nombre: 'Informe y Resultados de Estudio', url: item.informe_resultado },
              { nombre: 'Documento de Identificación', url: item.cedula_paciente }
            ]
          };
          return CartaAval;
        });
      },
      (error) => {
        console.error('Error al cargar los CartaAvals', error);
        this.mostrarNotificacion('Error al cargar las solicitudes.');
      }
    );
  }
}

import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PolizaService } from 'src/app/services/poliza.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { duration } from 'moment';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-consulta-admin',
  templateUrl: './consulta-admin.component.html',
  styleUrls: ['./consulta-admin.component.scss']
})
export class ConsultaAdminComponent implements OnInit {

  today: Date = new Date();
  tabIndex = 0;
  isLoading = false;

  displayedColumns: string[] = [
    'aseguradora', 'ramo', 'formaPago', 'nroPoliza', 'contratante', 'asegurado',
    'vigencia', 'trimestre1', 'trimestre2', 'trimestre3', 'trimestre4', 'renovacion', 'acciones'
  ];

  dataSource = new MatTableDataSource<any>([
    // !-- Datos de Prueba --!
    // {
    //   aseguradora: 'Oceania',
    //   ramo: 'PYME',
    //   formaPago: 'Semestral',
    //   nroPoliza: '505',
    //   contratante: 'grupo migo',
    //   asegurado: 'grupo migo',
    //   vigencia: '23/12/2023 - 23/12/2024',
    //   trimestre1: '23/12/2023 - 23/12/2024',
    //   trimestre2: '23/12/2023 - 23/12/2024',
    //   trimestre3: '23/12/2023 - 23/12/2024',
    //   trimestre4: '23/12/2023 - 23/12/2024',
    //   renovacion: '23/12/2024'
    // },
    // {
    //   aseguradora: 'Internacional',
    //   ramo: 'RCG',
    //   formaPago: 'Anual',
    //   nroPoliza: '506',
    //   contratante: 'empresa x',
    //   asegurado: 'empresa x',
    //   vigencia: '01/01/2024 - 01/01/2025',
    //   trimestre1: '01/01/2024 - 31/03/2024',
    //   trimestre2: '01/04/2024 - 30/06/2024',
    //   trimestre3: '01/07/2024 - 30/09/2024',
    //   trimestre4: '01/10/2024 - 01/01/2025',
    //   renovacion: '01/01/2025'
    // },
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('editarDialog') editarDialog!: TemplateRef<any>;

  constructor(
    private _router: Router,
    private dialog: MatDialog,
    private polizaService: PolizaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadPolizas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 5;
  }

  loadPolizas(): void {
    this.isLoading = true;
    this.polizaService.getPolizas().subscribe({
      next: (polizas) => {
        this.dataSource.data = polizas.map(p => this. formatPolizaData(p));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando pólizas:', error);
        this.snackBar.open('Error al cargar pólizas', 'Cerrar', {duration: 3000});
        this.isLoading = false;
      }
    })
  }

  private formatPolizaData(poliza: any): any {
    return {
        id: poliza.id,
        aseguradora: poliza.aseguradora.nombre,
        ramo: poliza.ramo.nombre,
        formaPago: poliza.forma_pago.nombre,
        nroPoliza: poliza.numero,
        contratante: poliza.contratante.nombre,
        asegurado: poliza.asegurado.nombre,
        vigencia: `${formatDate(poliza.fecha_inicio, 'dd/MM/yyyy', 'en-US')} - ${formatDate(poliza.fecha_fin, 'dd/MM/yyyy', 'en-US')}`,
        trimestre1: this.formatTrimestre(poliza.fecha_inicio, poliza.i_trimestre),
        trimestre2: this.formatTrimestre(poliza.fecha_inicio, poliza.ii_trimestre),
        trimestre3: this.formatTrimestre(poliza.fecha_inicio, poliza.iii_trimestre),
        trimestre4: this.formatTrimestre(poliza.fecha_inicio, poliza.iv_trimestre),
        renovacion: poliza.renovacion
      };
    }

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
    // Implementa aquí la lógica de exportar (ejemplo: CSV/Excel)
    alert('Funcionalidad de exportar pendiente de implementar.');
    //  this.snackBar.open('Exportando datos...', 'Cerrar', { duration: 2000 });
  }

  editarElemento(element: any) {
    // Abrir el diálogo de edición usando el template y pasar una copia del elemento
    const dialogRef = this.dialog.open(this.editarDialog, {
      width: '800px',
      data: { ...element }
    });

     dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.updatePoliza(result);
      }
    });
  }

    agregarRegistro() {
    const nuevo: any = {
      nroPoliza: '',
      aseguradora: '',
      ramo: '',
      formaPago: '',
      contratante: '',
      asegurado: '',
      vigencia: '',
      trimestre1: '',
      trimestre2: '',
      trimestre3: '',
      trimestre4: '',
      renovacion: ''
    };
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
    // Transformar datos al formato esperado por el backend
    const polizaToCreate = {
      numero: polizaData.nroPoliza,
      aseguradora: { nombre: polizaData.aseguradora },
      ramo: { nombre: polizaData.ramo },
      forma_pago: { nombre: polizaData.formaPago },
      contratante: { nombre: polizaData.contratante },
      asegurado: { nombre: polizaData.asegurado },
      fecha_inicio: new Date(polizaData.vigencia.split(' - ')[0]),
      fecha_fin: new Date(polizaData.vigencia.split(' - ')[1]),
      i_trimestre: parseFloat(polizaData.trimestre1),
      ii_trimestre: parseFloat(polizaData.trimestre2),
      iii_trimestre: parseFloat(polizaData.trimestre3),
      iv_trimestre: parseFloat(polizaData.trimestre4),
      renovacion: polizaData.renovacion
    };

    this.polizaService.createPoliza(polizaToCreate).subscribe({
      next: (response) => {
        this.snackBar.open('Póliza creada exitosamente', 'Cerrar', { duration: 3000 });
        this.loadPolizas();
      },
      error: (error) => {
        this.snackBar.open('Error al crear póliza', 'Cerrar', { duration: 3000 });
      }
    });
  }

  updatePoliza(polizaData: any) {
    const polizaToUpdate = {
      id: polizaData.id,
      numero: polizaData.nroPoliza,
      aseguradora: { nombre: polizaData.aseguradora },
      ramo: { nombre: polizaData.ramo },
      forma_pago: { nombre: polizaData.formaPago },
      contratante: { nombre: polizaData.contratante },
      asegurado: { nombre: polizaData.asegurado },
      fecha_inicio: new Date(polizaData.vigencia.split(' - ')[0]),
      fecha_fin: new Date(polizaData.vigencia.split(' - ')[1]),
      i_trimestre: parseFloat(polizaData.trimestre1),
      ii_trimestre: parseFloat(polizaData.trimestre2),
      iii_trimestre: parseFloat(polizaData.trimestre3),
      iv_trimestre: parseFloat(polizaData.trimestre4),
      renovacion: polizaData.renovacion
    };

    this.polizaService.updatePoliza(polizaData.id, polizaToUpdate).subscribe({
      next: (response) => {
        this.snackBar.open('Póliza actualizada exitosamente', 'Cerrar', { duration: 3000 });
        this.loadPolizas();
      },
      error: (error) => {
        this.snackBar.open('Error al actualizar póliza', 'Cerrar', { duration: 3000 });
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
          this.snackBar.open('Error al eliminar póliza', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  consultar() {
    this.tabIndex = 1;
    const fechaConsulta = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
    this.isLoading = true;
    
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

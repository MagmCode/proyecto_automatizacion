import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// Servicios
import { PolizaService } from 'src/app/services/poliza.service';
import { AseguradoraService } from 'src/app/services/aseguradora.service';
import { ContratanteService } from 'src/app/services/contratante.service';
import { AseguradoService } from 'src/app/services/asegurado.service';

@Component({
  selector: 'app-reportes-admin',
  templateUrl: './reportes-admin.component.html',
  styleUrls: ['./reportes-admin.component.scss']
})
export class ReportesAdminComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Variables de control de UI
  tabIndex = 0;
  isLoading = false;

  // Arrays para los dropdowns. 
  // IMPORTANTE: Ahora guardarán objetos completos {id, nombre, ...} en lugar de solo strings.
  aseguradoras: any[] = [];
  contratantes: any[] = [];
  asegurados: any[] = [];

  // Variables para los modelos (ngModel).
  // Se inicializan vacíos. Los selects guardarán el OBJETO completo seleccionado.
  selectedAseguradora: any = '';
  selectedContratante: any = '';
  selectedAsegurado: any = '';
  
  // Fechas (Inicializadas con la fecha actual)
  fechaDesde: Date | null = new Date();
  fechaHasta: Date | null = new Date();
  maxDate: Date = new Date(); // Para limitar fecha hasta hoy (opcional)

  displayedColumns: string[] = [
    'nroPoliza', 'aseguradora', 'ramo', 'formaPago', 'contratante', 'asegurado',
    'vigencia', 'primaTotal', 'renovacion'
  ];

  // CORRECCIÓN PRINCIPAL: Se agrega <any> para evitar el error "Type 'any[]' is not assignable to type 'never[]'"
  dataSource = new MatTableDataSource<any>([]); 

  constructor(
    private polizaService: PolizaService,
    private aseguradoraService: AseguradoraService,
    private contratanteService: ContratanteService,
    private aseguradoService: AseguradoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarCatalogos();
  }

  ngAfterViewInit(): void {
    // Vinculamos el paginador si existe
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  cargarCatalogos() {
    // Cargar listas completas (objetos) para obtener el ID necesario para el filtro
    this.aseguradoraService.getAseguradoras().subscribe({
      next: (res) => this.aseguradoras = res,
      error: (err) => console.error('Error cargando aseguradoras', err)
    });

    this.contratanteService.getContratantes().subscribe({
      next: (res) => this.contratantes = res,
      error: (err) => console.error('Error cargando contratantes', err)
    });

    this.aseguradoService.getAsegurados().subscribe({
      next: (res) => this.asegurados = res,
      error: (err) => console.error('Error cargando asegurados', err)
    });
  }

  buscar() {
    this.isLoading = true;
    const filtros = this.obtenerFiltrosFormateados();

    this.polizaService.getReportePolizas(filtros).subscribe({
      next: (data) => {
        // Mapeamos los datos usando la función de formato para que la tabla los entienda
        this.dataSource.data = data.map(p => this.formatPolizaData(p));
        this.isLoading = false;
        
        // Cambiar automáticamente a la pestaña de resultados (índice 1)
        this.tabIndex = 1; 
        
        if (data.length === 0) {
          this.snackBar.open('No se encontraron resultados con esos filtros', 'Cerrar', { duration: 3000 });
        }
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.snackBar.open('Error al consultar reporte', 'Cerrar', { duration: 3000 });
      }
    });
  }

  exportarExcel() {
    const filtros = this.obtenerFiltrosFormateados();
    this.snackBar.open('Generando Excel...', '', { duration: 1000 });
    
    this.polizaService.exportarReporteExcel(filtros).subscribe({
      next: (blob) => {
        // Crear un link temporal invisible para descargar el archivo blob
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const timestamp = formatDate(new Date(), 'yyyyMMdd_HHmm', 'en-US');
        a.download = `Reporte_Polizas_${timestamp}.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al descargar Excel', 'Cerrar', { duration: 3000 });
      }
    });
  }

  salir() {
    this.router.navigate(['/analist/home-page']); // O la ruta deseada
  }

  // Prepara el objeto de filtros para enviar al servicio
  private obtenerFiltrosFormateados() {
    return {
      fechaDesde: this.fechaDesde ? formatDate(this.fechaDesde, 'yyyy-MM-dd', 'en-US') : '',
      fechaHasta: this.fechaHasta ? formatDate(this.fechaHasta, 'yyyy-MM-dd', 'en-US') : '',
      // Enviamos el ID si hay un objeto seleccionado (verificamos si existe .id), de lo contrario vacío
      aseguradora: this.selectedAseguradora && this.selectedAseguradora.id ? this.selectedAseguradora.id : '',
      contratante: this.selectedContratante && this.selectedContratante.id ? this.selectedContratante.id : '',
      asegurado: this.selectedAsegurado && this.selectedAsegurado.id ? this.selectedAsegurado.id : ''
    };
  }

  // Da formato a los datos que vienen del backend para mostrarlos en la tabla
  private formatPolizaData(poliza: any): any {
    return {
      id: poliza.id,
      nroPoliza: poliza.numero,
      // Mapeo seguro de nombres usando optional chaining (?.)
      aseguradora: poliza.aseguradora_nombre?.nombre || 'N/A',
      ramo: poliza.ramo_nombre?.nombre || 'N/A',
      formaPago: poliza.forma_pago_nombre || 'N/A',
      contratante: poliza.contratante?.nombre || 'N/A',
      asegurado: poliza.asegurado?.nombre || 'N/A',
      
      vigencia: `${formatDate(poliza.fecha_inicio, 'dd/MM/yyyy', 'en-US')} - ${formatDate(poliza.fecha_fin, 'dd/MM/yyyy', 'en-US')}`,
      primaTotal: poliza.prima_total,
      renovacion: poliza.renovacion
    };
  }
}
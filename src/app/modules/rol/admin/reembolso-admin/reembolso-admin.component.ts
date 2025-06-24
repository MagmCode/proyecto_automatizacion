import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ReembolsoService, Reembolso } from 'src/app/services/reembolsos.service'; 
import { MatSort } from '@angular/material/sort';
import { MatSelectChange } from '@angular/material/select';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reembolso-admin',
  templateUrl: './reembolso-admin.component.html',
  styleUrls: ['./reembolso-admin.component.scss']
})
export class ReembolsoAdminComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'fecha_reporte', 'nro_siniestro', 'paciente', 'estatus', 'ver'];
  dataSource = new MatTableDataSource<Reembolso>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filters: { [key: string]: string } = {}; // Asegurarse de que está inicializado correctamente
  dateRangeForm: FormGroup;

  constructor(
    private router: Router,
    private reembolsoService: ReembolsoService,
    private fb: FormBuilder
  ) {
    this.dateRangeForm = this.fb.group({
      start: [''],
      end: ['']
    });
  }

  ngOnInit(): void {
    // Obtener los datos de reembolsos desde el servicio
    this.reembolsoService.getReembolsos().subscribe(data => {
      this.dataSource.data = data;

      // Configurar MatSort después de que los datos estén cargados
      this.dataSource.sort = this.sort;
    });

    // Configurar el predicate de filtro personalizado
    this.dataSource.filterPredicate = this.createFilter();

    // Escuchar cambios en el rango de fechas
    this.dateRangeForm.valueChanges.subscribe(() => {
      this.applyDateRangeFilter();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; // Asegúrate de configurar el MatSort
    this.paginator.pageSize = 5; // Mostrar solo 5 filas por página
  }

  findFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyStatusFilter(event: MatSelectChange): void {
    this.filters['estatus'] = event.value.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filters);
  }

  applyDateRangeFilter(): void {
    const startDate = new Date(this.dateRangeForm.get('start')!.value);
    const endDate = new Date(this.dateRangeForm.get('end')!.value);
    
    if (startDate && endDate) {
      startDate.setHours(0, 0, 0, 0); // Ajustar la hora de inicio al principio del día
      endDate.setHours(23, 59, 59, 999); // Ajustar la hora de fin al final del día

      this.filters['fecha_reporte'] = JSON.stringify({ start: startDate, end: endDate });
    } else {
      delete this.filters['fecha_reporte'];
    }
    this.dataSource.filter = JSON.stringify(this.filters);
  }

  createFilter(): (data: Reembolso, filter: string) => boolean {
    return (data: Reembolso, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);
      let isMatch = true;

      for (const column in searchTerms) {
        if (column === 'fecha_reporte') {
          const dateRange = JSON.parse(searchTerms[column]);
          const fechaReporte = new Date(data[column as keyof Reembolso]);
          const startDate = new Date(dateRange.start);
          const endDate = new Date(dateRange.end);

          // Incluir las fechas límite en el rango
          if (fechaReporte < startDate || fechaReporte > endDate) {
            isMatch = false;
          }
        } else {
          if (searchTerms[column] && !data[column as keyof Reembolso]?.toString().toLowerCase().includes(searchTerms[column])) {
            isMatch = false;
          }
        }
      }
      return isMatch;
    };
  }

  clearDateRange(): void {
    this.dateRangeForm.reset();
    delete this.filters['fecha_reporte']; // Eliminar el filtro de fecha
    this.dataSource.filter = JSON.stringify(this.filters); // Reaplicar filtros
  }

  verDetalle(id: number): void {
    this.router.navigate(['admin/reembolso/detalle', id]);
  }
}

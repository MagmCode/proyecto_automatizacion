import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReembolsoService, Reembolso } from 'src/app/services/reembolsos.service'; 
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-detalle-reembolso',
  templateUrl: './detalle-reembolso.component.html',
  styleUrls: ['./detalle-reembolso.component.scss']
})
export class DetalleReembolsoComponent implements OnInit {
  id!: number;
  reembolso!: Reembolso | undefined;
  estatusSeleccionado: string = ''; // Inicializamos la variable

  displayedColumns: string[] = ['descripcion', 'acciones'];

  dataSource = [
    { descripcion: 'Informe amplio y detallado' },
    { descripcion: 'Informes y resultados de estudios realizados' },
    { descripcion: 'Documento de identidad del paciente' }
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private route: ActivatedRoute, private reembolsoService: ReembolsoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // Obtener el ID de los parámetros de la ruta
    this.id = +this.route.snapshot.paramMap.get('id')!;
    
    // Obtener el reembolso por ID
    this.reembolsoService.getReembolsoById(this.id).subscribe(data => {
      this.reembolso = data;
    });
  }
  ngAfterViewInit(): void {
    // Vincula el paginador con la fuente de datos

  }

  verDocumento(element: any): void {
    // Lógica para ver el documento
    console.log('Ver documento:', element.descripcion);
  }

  descargarDocumento(element: any): void {
    // Lógica para descargar el documento
    console.log('Descargar documento:', element.descripcion);
  }

}

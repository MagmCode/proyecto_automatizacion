import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartaAvalService, CartaAval } from 'src/app/services/carta-aval.service'; 
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detalle-cartaaval-analist',
  templateUrl: './detalle-cartaaval-analist.component.html',
  styleUrls: ['./detalle-cartaaval-analist.component.scss']
})
export class DetalleCartaavalAnalistComponent implements OnInit {

  id!: number;
  cartaAval!: CartaAval | undefined;
  estatusSeleccionado: string = ''; // Inicializamos la variable

  displayedColumns: string[] = ['descripcion', 'acciones'];

  dataSource = [
    { descripcion: 'Informe amplio y detallado' },
    { descripcion: 'Informes y resultados de estudios realizados' },
    { descripcion: 'Documento de identidad del paciente' }
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referencia al paginador

  constructor(private route: ActivatedRoute, private cartaAvalService: CartaAvalService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // Obtener el ID de los parámetros de la ruta
    this.id = +this.route.snapshot.paramMap.get('id')!;
    
    // Obtener el reembolso por ID
    this.cartaAvalService.getCartaAvalById(this.id).subscribe(data => {
      this.cartaAval = data;
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

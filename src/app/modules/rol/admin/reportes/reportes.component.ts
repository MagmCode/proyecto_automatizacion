import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  public urlReembolsoSemanal = 'http://localhost:8000/reporte-reembolsos-semanal/';
  public urlReembolsoMensual = 'http://localhost:8000/reporte-reembolsos-mensual/';
  public urlCartaAvalSemanal = 'http://localhost:8000/reporte-cartas-aval-semanal/';
  public urlCartaAvalMensual = 'http://localhost:8000/reporte-cartas-aval-mensual/';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  descargarReporteSemanalReembolso() {
    this.http.get(this.urlReembolsoSemanal, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(response);
        link.download = 'reporte_reembolsos_semanal.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error al descargar el reporte:', error);
        alert('No se pudo descargar el reporte. Inténtalo de nuevo.');
      }
    );
  }

  descargarReporteMensualReembolso() {
    this.http.get(this.urlReembolsoMensual, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(response);
        link.download = 'reporte_reembolsos_mensual.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error al descargar el reporte:', error);
        alert('No se pudo descargar el reporte. Inténtalo de nuevo.');
      }
    );
  }

  descargarReporteSemanalCartaval() {
    this.http.get(this.urlCartaAvalSemanal, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(response);
        link.download = 'reporte_cartas_aval_semanal.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error al descargar el reporte:', error);
        alert('No se pudo descargar el reporte. Inténtalo de nuevo.');
      }
    );
  }

  descargarReporteMensualCartaval() {
    this.http.get(this.urlCartaAvalMensual, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(response);
        link.download = 'reporte_cartas_aval_mensual.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error al descargar el reporte:', error);
        alert('No se pudo descargar el reporte. Inténtalo de nuevo.');
      }
    );
  }
}
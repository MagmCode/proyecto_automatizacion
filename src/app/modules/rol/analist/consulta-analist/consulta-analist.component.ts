import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta-analist',
  templateUrl: './consulta-analist.component.html',
  styleUrls: ['./consulta-analist.component.scss']
})
export class ConsultaAnalistComponent implements OnInit {

  today: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}

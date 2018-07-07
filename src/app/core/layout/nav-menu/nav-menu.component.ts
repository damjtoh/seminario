import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  @Input() role: string;
  public menuSections = {
    medico: [
      {
        path: 'generar-indicacion',
        description: 'Generar indicación'
      },
      {
        path: 'indicaciones-rechazadas',
        description: 'Indiaciones rechazadas'
      }
    ],
    farmaceutico: [
      {
        path: '',
        description: ''
      }
    ]
  }
  constructor() { }

  ngOnInit() {
  }

}

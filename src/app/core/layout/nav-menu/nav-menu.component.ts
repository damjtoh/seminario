import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  @Input() role: string;
  public menuSections = {
    MEDICO: [
      {
        path: 'generar-indicacion',
        description: 'Generar indicación'
      },
      {
        path: 'indicaciones-rechazadas',
        description: 'Indiaciones rechazadas'
      }
    ],
    FARMACEUTICO: [
      {
        path: 'alta-medicamentos',
        description: 'Alta de medicamentos'
      },
      {
        path: 'modificacion-medicamentos',
        description: 'Modificacion de medicamentos'
      },
      {
        path: 'baja-medicamentos',
        description: 'Baja de medicamentos'
      },
      {
        path: 'indicaciones-pendientes',
        description: 'Indicaciones pendientes'
      },
      {
        path: 'indicaciones-validadas',
        description: 'Indicaciones válidadas'
      },
      {
        path: 'solocitar-compras',
        description: 'Solicitar compras'
      },
      {
        path: 'reporte-stock',
        description: 'Reporte de Stock'
      },
      {
        path: 'medicamentos-otorgados',
        description: 'Medicamentos otorgados'
      },
    ],
    ENFERMERO: [
      {
        path: 'indicaciones-enviadas',
        description: 'Aceptar medicacion'
      },
      {
        path: 'dosis',
        description: 'Registro de dosis otorgada'
      },
    ]
  }
  constructor() { }

  ngOnInit() {
  }

}

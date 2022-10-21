import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var $:any;


@Component({
  selector: 'app-menu-comprimido',
  templateUrl: './menu-comprimido.component.html',
  styleUrls: ['./menu-comprimido.component.css']
})
export class MenuComprimidoComponent implements OnInit {
  @Input() menu!: boolean;

  certificado:    boolean = false;
  desprendible:   boolean = false;
  vacaciones:     boolean = false;
  incapacidad:    boolean = false;
  cv:             boolean = false;
  organigrama:    boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.menu        = false;
    this.certificado = false;
    this.desprendible= false;
    this.vacaciones  = false;
    this.incapacidad = false;
    this.cv          = false;
    this.organigrama = false;
  }
}

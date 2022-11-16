import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vacaciones } from 'src/app/models/vacaciones'; 
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from 'src/app/service/global';
declare var $:any;

@Component({
  selector: 'app-vacacion',
  templateUrl: './vacacion.component.html',
  styleUrls: ['./vacacion.component.css']
})
export class VacacionComponent implements OnInit {

  @Input() vacaciones: Vacaciones;
  @Output() MarcarFavorita = new EventEmitter;
  public url:string;

  constructor(
  ) {
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
  }
  seleccionar(event:any, vacaciones:any){
    this.MarcarFavorita.emit({
      vacaciones:vacaciones
    });
  }
}

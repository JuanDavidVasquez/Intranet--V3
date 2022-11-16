import {Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Postulacion } from 'src/app/models/postulacion';
import { GLOBAL } from 'src/app/service/global';
declare var $:any;

@Component({
  selector: 'app-postulado',
  templateUrl: './postulado.component.html',
  styleUrls: ['./postulado.component.css'],
})
export class PostuladoComponent implements OnInit {
 
  public title:string;
  public identity;
  public token;
  public status:string;
  public url: string;

  @Input() postulacion: Postulacion;
  @Output() MarcarFavorita = new EventEmitter;
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
  ) { 
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {

  }
  seleccionar(event: any, postulacion: any){
    this.MarcarFavorita.emit({
      postulacion: postulacion
    });
  }
}

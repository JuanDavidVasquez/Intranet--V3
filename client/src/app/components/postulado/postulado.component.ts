import {Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Postulacion } from 'src/app/models/postulacion';
import { PostulacionService } from 'src/app/service/postulacion.service';
import { GLOBAL } from 'src/app/service/global';
declare var $:any;

@Component({
  selector: 'app-postulado',
  templateUrl: './postulado.component.html',
  styleUrls: ['./postulado.component.css'],
  providers: [ PostulacionService ]
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
    private _postulacionService:PostulacionService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
			let id = params['id'];
		//	this.getUser(id);
		});
  }
  seleccionar(event: any, postulacion: any){
    this.MarcarFavorita.emit({
      postulacion: postulacion
    });
  }
}

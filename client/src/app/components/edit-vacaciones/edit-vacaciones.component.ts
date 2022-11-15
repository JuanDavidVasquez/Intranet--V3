import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Vacaciones } from 'src/app/models/vacaciones';
import { VacacionesService } from 'src/app/service/vacaciones.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-edit-vacaciones',
  templateUrl: './edit-vacaciones.component.html',
  styleUrls: ['./edit-vacaciones.component.css'],
  providers: [VacacionesService, UserService]
})
export class EditVacacionesComponent implements OnInit {

  public title:string;
  public identity;
  public token;
  public status:string;
  public url: string;
  public vacaciones: Vacaciones;
  public user: User;
  public fecha:any;
  public fechaEstimada:any;
  public dias:Number;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _vacacionesService: VacacionesService
  ) { 
    this.title = 'Solicitud de vacaciones!!!';
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.fecha = Date(); 
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.fechas();
  }
  fechas(){
    var fechaEstimada = new Date(this.fecha);
    var dias = 15; // Número de días a agregar
    fechaEstimada.setDate(fechaEstimada.getDate() + dias);
    console.log(fechaEstimada);
    return fechaEstimada;
  }
  onSubmit(){
    this._vacacionesService.saveVacaciones(this.vacaciones, this.token).subscribe(
      response =>{
        if(response.vacaciones){
          this.token = response.token;
          this.status = 'success';
        }else{
          this.status = 'error';
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }
  ngDoCheck(){
  	this.identity = this._userService.getIdentity();
  }

}

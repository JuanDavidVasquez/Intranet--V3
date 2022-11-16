import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Vacaciones } from 'src/app/models/vacaciones';
import { VacacionesService } from 'src/app/service/vacaciones.service';
import { GLOBAL } from 'src/app/service/global';
import { User } from 'src/app/models/user';
import {UserService } from 'src/app/service/user.service';
declare var $:any;

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.css'],
  providers: [VacacionesService, UserService]
})
export class VacacionesComponent implements OnInit {

  public title:string;
  public token;
  public identity;
  public status:string;
  public url:string;
  public vacacioness:Vacaciones[];
  public favorita!: Vacaciones;
  public searchString:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _vacacionesService:VacacionesService,
    private _userService:UserService
  ) { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.title = 'Solicitudes de Vacaciones';
  }

  ngOnInit(): void {
    this.getVacacioness();
    this.mostrarFavorita(event);
  }
  mostrarFavorita(event: any){
    this.favorita = event.vacaciones;
    $('#favorita').toggle('explode');
  }
  getVacacioness(){
    this._vacacionesService.getVacacioness().subscribe(
      response =>{
        if(!response.vacacioness){
          this.status = 'error';
        }else{
          this.vacacioness = response.vacacioness;
        }
      },
      error =>{
        var errorMessage = <any>error;
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    );
  }
/*Buscador de vacaciones
  goSearch(){
    this._router.navigate(['/buscar-vacaciones'],this.searchString);
  }
*/
}

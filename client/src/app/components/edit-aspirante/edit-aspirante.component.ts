import { Component, OnInit } from '@angular/core';
import { Aspirante } from 'src/app/models/aspirante';
import { AspiranteService } from 'src/app/service/aspirante.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { GLOBAL } from 'src/app/service/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
declare var $:any;

@Component({
  selector: 'app-edit-aspirante',
  templateUrl: './edit-aspirante.component.html',
  styleUrls: ['./edit-aspirante.component.css'],
  providers:[AspiranteService, UserService]
})
export class EditAspiranteComponent implements OnInit {
 
  public fecha:any;
  public title: string;
  public user: User;
	public aspirante: Aspirante;
  public aspiranteid;
	public identity;
	public token;
	public status: string;
	public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _aspiranteService: AspiranteService,
    private _userService:UserService
  ) { 
    this.title = 'Editar de Aspirantes';
    this.user = this._userService.getIdentity();
    this.aspiranteid = this._aspiranteService.getAspiranteid();
    this.identity = this.user;
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.fecha = new Date(2022, 10, 3);
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
   
    $('body').css('background','url(../../../assets/img/rrhh/fondorrhh.jpg)')
    .css('background-repeat','no-repeat');	
		
		this._route.params.subscribe(params => {
			let id = params['id'];
			this.getAspirante(id,this.token);
		});
  }
  getAspirante(id,token){
    this._aspiranteService.getAspirante(id,token).subscribe(
      response => {
				this.aspirante = response.aspirante;
			},
			error => {
				console.log(<any>error);
			}
		)
	}

  onSubmit(){
    console.log(this.aspirante);
    this._aspiranteService.updateAspirante(this.aspirante,this.token).subscribe(
      response => {
        if(!response.aspirante){
          this.status = 'error';
        }else{
          this.status = 'success';		
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
  
        if(errorMessage != null){
          this.status = 'error';
        }
      }
    );
  }
}



/*
getAspirantes(token){
  this._aspiranteService.getAspirantes(token).subscribe(
    response => {
      if(!response.aspirantes){
        this.status = 'error';
      }else{
        this.aspirantes = response.aspirantes;
        this.token = response.token;
      }
    },
    error => {
      var errorMessage = <any>error;
      console.log(errorMessage);

      if(errorMessage != null){
        this.status = 'error';
      }
    }
  );
}*/
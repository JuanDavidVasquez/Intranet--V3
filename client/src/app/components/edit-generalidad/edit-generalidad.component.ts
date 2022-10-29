import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Generalidad } from 'src/app/models/generalidad';
import { GeneralidadService } from 'src/app/service/generalidad.service';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-edit-generalidad',
  templateUrl: './edit-generalidad.component.html',
  styleUrls: ['./edit-generalidad.component.css'],
  providers:[GeneralidadService, UserService]
})
export class EditGeneralidadComponent implements OnInit {


  public title: string;
	public user: User;
	public generalidad: Generalidad;
	public status: string;
	public url: string;
	public token;
	public identity;
	public pgeneralidad;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _generalidadService:GeneralidadService,
    private _userService:UserService 
  ) { 
    this.title = 'Editar generalidad';
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this._route.params.subscribe(params => {
			let id = params['id'];
      this.getGeneralidad(id,this.token);
	});
  }

  getGeneralidad(id,token){
	this._generalidadService.getGeneralidad(id,token).subscribe(
		response => {
			this.generalidad = response.generalidad;
		},
		error => {
			console.log(<any>error);
		}
	)
}

onSubmit(){
	this._generalidadService.updateGeneralidad(this.generalidad,this.token).subscribe(
		response => {
			if(!response.generalidad){
				this.status = 'error';
			}else{
				this.status = 'success';
					this.pgeneralidad = this.generalidad;
						
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
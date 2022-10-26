import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PerfilLaboral } from 'src/app/models/perfilLaboral';
import { PerfilLaboralService } from 'src/app/service/perfilLaboral.service';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [PerfilLaboralService, UserService]
})
export class PerfilComponent implements OnInit {

 
	public title: string;
	public perfilLaboral: PerfilLaboral;
	public user: User;
	public identity;
	public token;
	public status: string;
	public url: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _perfilLaboralService: PerfilLaboralService,
		private _userService: UserService,
	){
		this.title = 'Registro de Perfil Laboral';
		this.user = this._userService.getIdentity();
		this.identity = this.user;
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

	ngOnInit(){
		this.identity = this._userService.getIdentity();
		this.perfilLaboral = new PerfilLaboral("","","","","","","","","","","","");
		this.url = GLOBAL.url;
	}
	onSubmit(form:any){
		console.log(this.perfilLaboral);
		this._perfilLaboralService.savePerfilLaboral(this.perfilLaboral,this.token).subscribe(
		  response => {
			if(!response.perfilLaboral){
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
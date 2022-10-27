import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PerfilLaboral } from 'src/app/models/perfilLaboral';
import { PerfilLaboralService } from 'src/app/service/perfilLaboral.service';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
declare var $: any;

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
	selector: 'app-perfil',
	templateUrl: './perfil.component.html',
	styleUrls: ['./perfil.component.css'],
	providers: [PerfilLaboralService, UserService]
})
export class PerfilComponent implements OnInit, OnChanges{
	@Input() prop: number = 0;

	public title: string;
	public perfilLaboral: PerfilLaboral;
	public user: User;
	public identity;
	public token;
	public status: string;
	public url: string;
	public perfilLaborals: PerfilLaboral[];
	public users: User[];
	public perfilLaboralId;
	
	
	@Input() name: string;
	serverElements: any;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _perfilLaboralService: PerfilLaboralService,
		private _userService: UserService,
	) {
		this.title = 'Registro experiencia laboral';
		this.user = this._userService.getIdentity();
		this.identity = this.user;
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.perfilLaboralId = this.identity._id;
	}
	ngOnChanges(changes: SimpleChanges):void{
		console.log(changes);
	}
	ngOnInit() {
		this.identity = this._userService.getIdentity();
		this.perfilLaboral = new PerfilLaboral("", "", "", "", "", "", "", "", "", "", "", "");
		this.url = GLOBAL.url;
		this.getPerfilLaboralUser(this.perfilLaboralId,this.token);
	}
	
	
	getPerfilLaboralUser(perfilLaboralId,token):void{
		
		this._perfilLaboralService.getPerfilLaboralUser(perfilLaboralId,token).subscribe(
		  response =>{
			if(!response.perfilLaborals){
			  this.status = 'error';

			}else{
			  console.log(response.perfilLaboral);
			  console.log('getPerfilLaboralUser');
			  this.perfilLaborals = response.perfilLaborals;
			}
		  },
		  error=>{
			var errorMessage = <any>error;
			if(errorMessage != null){
			  this.status = 'erroor';
			}
		  }
		)
	   }
	onSubmit(form: any) {
		console.log(this.perfilLaboral);
		this._perfilLaboralService.savePerfilLaboral(this.perfilLaboral, this.token).subscribe(
			response => {
				if (!response.perfilLaboral) {
					this.status = 'error';
				} else {
					this.status = 'success';
					this._router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=> this._router.navigate(['perfil/'+this.identity._id]));
				}
			},
			error => {
				var errorMessage = <any>error;
				console.log(errorMessage);

				if (errorMessage != null) {
					this.status = 'error';
				}
			}
		);
	}
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Salud } from 'src/app/models/salud';
import { SaludService } from 'src/app/service/salud.service';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-salud',
  templateUrl: './edit-salud.component.html',
  styleUrls: ['./edit-salud.component.css'],
  providers:[SaludService, UserService]
})
export class EditSaludComponent implements OnInit {

  public title: string;
	public user: User;
	public salud: Salud;
	public status: string;
	public url: string;
	public token;
	public identity;
	public psalud;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _saludService:SaludService,
    private _userService:UserService 
  ) { 
    this.title = 'Editar salud';
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this._route.params.subscribe(params => {
			let id = params['id'];
      this.getSalud(id,this.token);
	});
  }

  getSalud(id,token){
	this._saludService.getSalud(id,token).subscribe(
		response => {
			this.salud = response.salud;
		},
		error => {
			console.log(<any>error);
		}
	)
}

onSubmit(){
	this._saludService.updateSalud(this.salud,this.token).subscribe(
		response => {
			if(!response.salud){
				this.status = 'error';
			}else{
				this.status = 'success';
					this.psalud = this.salud;
						
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
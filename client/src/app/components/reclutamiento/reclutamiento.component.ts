import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Aspirante } from 'src/app/models/aspirante';
import { UserService } from 'src/app/service/user.service';
import { AspiranteService } from 'src/app/service/aspirante.service';
import { GLOBAL } from 'src/app/service/global';
declare var $:any;

@Component({
  selector: 'app-reclutamiento',
  templateUrl: './reclutamiento.component.html',
  styleUrls: ['./reclutamiento.component.css'],
  providers: [UserService, AspiranteService]
})
export class ReclutamientoComponent implements OnInit {

	public title;
	public identity;
	public token;
	public status:string;
	public url: string;
	public aspirantes: Aspirante[];
	public users: User[];
	public user: User;
	public searchString: string;


  constructor(
	private _route:ActivatedRoute,
    private _router:Router,
    private _aspiranteService:AspiranteService,
    private _userService:UserService
  ) { 
   	    this.title = 'Reclutamiento';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
  }

  ngOnInit(): void {
	$('body').css('background','url(../../../assets/img/rrhh/fondorrhh.jpg)')
				.css('background-repeat','no-repeat');

	this.getAspirantes(this.token);
	console.log(this.token+' token de reclutamiento');
	console.log(this.identity);
}
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
	}
	goSearch(){
		this._router.navigate(['/buscar-aspirante', this.searchString]);
	  }
}

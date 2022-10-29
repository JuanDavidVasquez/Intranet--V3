import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Salud } from 'src/app/models/salud';
import { SaludService } from 'src/app/service/salud.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
declare var $:any;

@Component({
  selector: 'app-perfil-salud',
  templateUrl: './perfil-salud.component.html',
  styleUrls: ['./perfil-salud.component.css'],
  providers:[SaludService, UserService]
})
export class PerfilSaludComponent implements OnInit {

  public title:string;
  public salud:Salud;
  public user:User;
  public identity;
  public token;
  public status:string;
  public url:string;
  public saluds:Salud[];
  public users: User[];
  public saludId;

  @Input() name: string;
  serverElements:any;
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _saludService:SaludService,
    private _userService: UserService
  ) { 
    this.title = 'Salud';
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
    this.saludId = this.identity._id;
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
		this.salud = new Salud("", "", "", "", "", "");
		this.url = GLOBAL.url;
		this.getSaludUser(this.saludId,this.token);
    console.log(this.identity);
    $('body').css('background','url(../../../assets/img/perfiles/fondoAcademico.jpg)')
    .css('background-repeat','no-repeat');
  }
  getSaludUser(saludId,token):void{
		
		this._saludService.getSaludUser(saludId,token).subscribe(
		  response =>{
			if(!response.saluds){
			  this.status = 'error';

			}else{
			  console.log(response.salud);
			  console.log('getsaludUser');
			  this.saluds = response.saluds;
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
		console.log(this.salud);
		this._saludService.saveSalud(this.salud, this.token).subscribe(
			response => {
				if (!response.salud) {
					this.status = 'error';
				} else {
					this.status = 'success';
					this._router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=> this._router.navigate(['salud/'+this.identity._id]));
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
import { Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Generalidad } from 'src/app/models/generalidad';
import { GeneralidadService } from 'src/app/service/generalidad.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
declare var $:any;


@Component({
  selector: 'app-perfil-generalidades',
  templateUrl: './perfil-generalidades.component.html',
  styleUrls: ['./perfil-generalidades.component.css'],
  providers:[GeneralidadService, UserService]
})
export class PerfilGeneralidadesComponent implements OnInit {


  public title:string;
  public generalidad:Generalidad;
  public user:User;
  public identity;
  public token;
  public status:string;
  public url:string;
  public generalidads:Generalidad[];
  public users: User[];
  public generalidadId;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _generalidadService:GeneralidadService,
    private _userService: UserService
  ) { 
    this.title = 'Generalidad';
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
    this.generalidadId = this.identity._id;
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
		this.generalidad = new Generalidad("", "", "", "", "", "", "");
		this.url = GLOBAL.url;
		this.getGeneralidadUser(this.generalidadId,this.token);
    console.log(this.identity);
    $('body').css('background','url(../../../assets/img/perfiles/fondoAcademico.jpg)')
    .css('background-repeat','no-repeat');
  }
  registrar(){
	$('.formularios').css('display','block');
  }
  getGeneralidadUser(generalidadId,token):void{
		
		this._generalidadService.getGeneralidadUser(generalidadId,token).subscribe(
		  response =>{
			if(!response.generalidads){
			  this.status = 'error';

			}else{
			  console.log(response.generalidad);
			  console.log('getgeneralidadUser');
			  this.generalidads = response.generalidads;
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
		console.log(this.generalidad);
		this._generalidadService.saveGeneralidad(this.generalidad, this.token).subscribe(
			response => {
				if (!response.generalidad) {
					this.status = 'error';
				} else {
					this.status = 'success';
					this._router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=> this._router.navigate(['perfil-generalidades/'+this.identity._id]));
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
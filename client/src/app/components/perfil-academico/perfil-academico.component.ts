import { Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PerfilAcademico } from 'src/app/models/perfilAcademico';
import { PerfilAcademicoService } from 'src/app/service/perfilAcademico.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
declare var $:any;

@Component({
  selector: 'app-perfil-academico',
  templateUrl: './perfil-academico.component.html',
  styleUrls: ['./perfil-academico.component.css'],
  providers: [PerfilAcademicoService, UserService]
})
export class PerfilAcademicoComponent implements OnInit {

  public title:string;
  public perfilAcademico:PerfilAcademico;
  public user: User;
  public identity;
  public token;
  public status:string;
  public url:string;
  public perfilAcademicos: PerfilAcademico[];
  public users: User[];
  public perfilAcademicoId;

  @Input() name: string;
	serverElements: any;
  constructor(
    private _route: ActivatedRoute,
		private _router: Router,
		private _perfilAcademicoService: PerfilAcademicoService,
		private _userService: UserService,
  ) { 
   	    this.title = 'Registro academico';
		this.user = this._userService.getIdentity();
		this.identity = this.user;
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.perfilAcademicoId = this.identity._id;
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
	this.perfilAcademico = new PerfilAcademico("", "", "", "", "", "", "", "", "");
	this.url = GLOBAL.url;
	this.getPerfilAcademicoUser(this.perfilAcademicoId,this.token);
    console.log(this.identity);
    $('body').css('background','url(../../../assets/img/perfiles/fondoAcademico.jpg)')
    .css('background-repeat','no-repeat');
  }
  getPerfilAcademicoUser(perfilAcademicoId,token):void{
		
		this._perfilAcademicoService.getPerfilAcademicoUser(perfilAcademicoId,token).subscribe(
		  response =>{
			if(!response.perfilAcademicos){
			  this.status = 'error';

			}else{
			  console.log(response.perfilAcademico);
			  console.log('getperfilAcademicoUser');
			  this.perfilAcademicos = response.perfilAcademicos;
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
		console.log(this.perfilAcademico);
		this._perfilAcademicoService.savePerfilAcademico(this.perfilAcademico, this.token).subscribe(
			response => {
				if (!response.perfilAcademico) {
					this.status = 'error';
				} else {
					this.status = 'success';
					this._router.navigateByUrl('/RefrshComponent', {skipLocationChange: true}).then(()=> this._router.navigate(['perfil-academico/'+this.identity._id]));
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
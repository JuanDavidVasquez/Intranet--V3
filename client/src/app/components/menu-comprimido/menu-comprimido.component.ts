import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from 'src/app/service/user.service';
import { UploadService } from 'src/app/service/upload.service';
import { GLOBAL } from 'src/app/service/global';
import { Observable } from 'rxjs';
declare var $:any;


@Component({
  selector: 'app-menu-comprimido',
  templateUrl: './menu-comprimido.component.html',
  styleUrls: ['./menu-comprimido.component.css'],
  providers: [UserService, UploadService]
})
export class MenuComprimidoComponent implements OnInit {
  @Input() menu!: boolean;
  API_ENDPOINT = 'http://localhost:3700/certificadolaboral/';

  certificado:    boolean = false;
  desprendible:   boolean = false;
  vacaciones:     boolean = false;
  incapacidad:    boolean = false;
  cv:             boolean = false;
  organigrama:    boolean = false;

  public title: string;
	public user: User;
	public identity;
	public token;
	public status: string;
	public url: string;

  constructor(
    private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _uploadService: UploadService
	){
		this.title = '';
		this.user = this._userService.getIdentity();
		this.identity = this.user;
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
	}

  ngOnInit(): void {
    this.menu        = false;
    this.certificado = false;
    this.desprendible= false;
    this.vacaciones  = false;
    this.incapacidad = false;
    this.cv          = false;
    this.organigrama = false;
  }
  dowlandcertificado(users: User)
	{
		console.log(this.API_ENDPOINT + users.cedula);
	 	/* return this.http.post<User>(this.API_ENDPOINT + users.cedula, this.httpOptions);  */ 
		 /* return this.http.get(this.API_ENDPOINT + this.user.cedula);  */

		 return this._uploadService.dowlandcertificado(this.user).subscribe(res => {  
			console.log('Descargando archivo');
			window.location.href = "http://localhost:3700/certificadolaboral/" + this.user._id;
      alert('Certificado descargado');
		   }
		  )
	}
}

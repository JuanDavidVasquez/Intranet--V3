import { Component, EventEmitter, Input, OnInit, Output, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from 'src/app/service/global';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from 'src/app/service/user.service';
import { UploadService } from 'src/app/service/upload.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
  providers: [UserService, UploadService]
})
export class MenusComponent implements OnInit {
  @Input() menu!: boolean;
  API_ENDPOINT = 'http://localhost:3700/certificadolaboral/';

  public title:string;
  public identity;
  public url: string;
  public user: User;
	public token;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
  	private _userService:UserService,
		private _uploadService: UploadService
  ){
  	this.title = 'Intranet';
    this.user = this._userService.getIdentity();
		this.identity = this.user;
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
  }

  ngOnInit(){
  	this.identity = this._userService.getIdentity();
    console.log(this.identity);
  }

  ngDoCheck(){
  	this.identity = this._userService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
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

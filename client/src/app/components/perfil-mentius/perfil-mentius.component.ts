import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import  { UploadService } from 'src/app/service/upload.service';
import { GLOBAL } from 'src/app/service/global';
declare var $:any;
@Component({
  selector: 'app-perfil-mentius',
  templateUrl: './perfil-mentius.component.html',
  styleUrls: ['./perfil-mentius.component.css'],
  providers: [UserService]
})
export class PerfilMentiusComponent implements OnInit {

  public title:string;
  public identity;
  public token;
  public status:string;
  public url: string;
  user: User;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService
  ) { 
    this.title = 'Mentius People';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
			let id = params['id'];
			this.getUser(id);
		});
    $('.footer').css('background','url(../../../assets/img/noticias/fondonoticias.jpg)')
    .css('background-repeat','no-repeat')
    .css('background-size','cover');
  }
  getUser(id){
    this._userService.getUser(id).subscribe(
      response => {
				this.user = response.user;
			},
			error => {
				console.log(<any>error);
			}
		)
	}
  regresar(){
    this._router.navigate(['/gente'])
  }
}

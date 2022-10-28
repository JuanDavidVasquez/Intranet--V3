import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from 'src/app/service/global';
import { UserService } from 'src/app/service/user.service';
declare var $:any;
@Component({
  selector: 'app-perfil-general',
  templateUrl: './perfil-general.component.html',
  styleUrls: ['./perfil-general.component.css']
})
export class PerfilGeneralComponent implements OnInit {

  public title:string;
  public identity;
  public token;
  public url:string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService
  ) { 
    this.title = 'Perfil Mentius';
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    $('body').css('background','url(../../../assets/img/perfiles/fondoPerfiles.jpg)')
    .css('background-repeat','no-repeat');
    console.log(this.identity._id)
  }

}

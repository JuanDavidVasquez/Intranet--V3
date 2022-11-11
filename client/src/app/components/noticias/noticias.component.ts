import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Noticia } from '../../models/noticia';
import { NoticiaService } from 'src/app/service/noticia.service';
import { UploadService } from 'src/app/service/upload.service';
import { GLOBAL } from '../../service/global';
import { gsap } from "gsap";
declare var $:any;


import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

declare var $:any;

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
  providers: [NoticiaService, UploadService, UserService]
})
export class NoticiasComponent implements OnInit {
  public identity;
  public token;
  public status:string;
  public url: string;
  public noticias: Noticia[];
  public users: User[];
  public favorita!: Noticia;
  img: any;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _noticiaService:NoticiaService,
    private _userService:UserService
  ) {
 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
     this.getNoticias();
     this.mostrarFavorita(event);
     $('body').css('background','none');
  }
  mostrarFavorita(event: any){
    this.favorita = event.noticia;
  }
  getNoticias(){
    this._noticiaService.getNoticias().subscribe(
      response =>{
        if(!response.noticias){
          this.status = 'error';
        }else{
          console.log(response.noticias);
          this.noticias = response.noticias;
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
}
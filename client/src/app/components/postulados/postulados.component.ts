import { Component, Input, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import { Postulacion } from 'src/app/models/postulacion';
import { PostulacionService } from 'src/app/service/postulacion.service';
import { GLOBAL } from 'src/app/service/global';
declare var $:any;

@Component({
  selector: 'app-postulados',
  templateUrl: './postulados.component.html',
  styleUrls: ['./postulados.component.css'],
  providers: [UserService, PostulacionService]
})
export class PostuladosComponent implements OnInit {

  public title:string;
  public identity;
  public token;
  public status:string;
  public url: string;
  public user:User;
  public postulacions: Postulacion[];
  public favorita!: Postulacion;


  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService,
    private _postulacionService:PostulacionService
  ) { 
    this.title = 'Postulaciones registradas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.getPostulacions();
    this.mostrarFavorita(event);
  }
  mostrarFavorita(event: any){
    this.favorita = event.postulacion;
    $('#favorita').toggle('drop');
    $('#favorita').toggle('drop');
  }
  getPostulacions(){
    this._postulacionService.getPostulacions(this.token).subscribe(
      response =>{
        if(!response.postulacions){
          this.status = 'error';
        }else{
          console.log(response.postulacions);
          this.postulacions = response.postulacions;
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

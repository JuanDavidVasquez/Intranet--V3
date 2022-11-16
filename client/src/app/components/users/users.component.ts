import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import  { UploadService } from 'src/app/service/upload.service';
import { GLOBAL } from 'src/app/service/global';
declare var $:any;
	

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {

  public title:string;
  public identity;
  public token;
  public status:string;
  public url: string;
  public users: User[];
  public favorita!: User;


  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService
  ) {
    this.title = 'Directorio Mentius';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
   }
  
  ngOnInit(): void {
    console.log("users.components ha sido cargado");
    this.getUsers();
    this.mostrarFavorita(event);
  }
  mostrarFavorita(event: any){
    this.favorita = event.user;
    $('#favorita').toggle('drop', 100);
    $('#favorita').toggle('drop', 700);
  }
   getUsers(){
    this._userService.getUsers().subscribe(
      response =>{
        if(!response.users){
          this.status = 'error';
        }else{
          console.log(response.users);
          this.users = response.users;
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

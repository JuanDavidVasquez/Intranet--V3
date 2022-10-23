import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from 'src/app/service/user.service';
import { GLOBAL } from 'src/app/service/global';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  title: string;
  public user:User;
  public status!: string;
  public identity;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) { 
    this.title = 'Register';
    this.user = new User("","","","","","","","","","","","","","","");
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    console.log(this.identity);
  }
  onSubmit(form:any){
    this._userService.register(this.user).subscribe(
      response =>{
        if(response.user && response.user._id){
          this.status = 'success';
          form.reset();
        }else{
          this.status = 'error';
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }
  ngDoCheck(){
  	this.identity = this._userService.getIdentity();
  }
}

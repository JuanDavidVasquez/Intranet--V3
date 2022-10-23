import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from 'src/app/service/global';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
 
  public title:string;
  public identity;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
  	private _userService:UserService
  ){
  	this.title = 'Intranet';
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

}

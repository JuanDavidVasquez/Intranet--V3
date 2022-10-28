import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from 'src/app/service/global';

declare var $:any;

@Component({
  selector: 'app-mentius',
  templateUrl: './mentius.component.html',
  styleUrls: ['./mentius.component.css']
})
export class MentiusComponent implements OnInit {
 
  public menus!:boolean;
  public title:string;
  public identity;
  public url: string;
 
  constructor(
    private router:Router,
    private _route: ActivatedRoute,
    private _router: Router,
  	private _userService:UserService) { 
      this.title = 'Intranet';
      this.url = GLOBAL.url;
  }
  ngOnInit(){
  	this.identity = this._userService.getIdentity();
  }
  ngDoCheck(){
  	this.identity = this._userService.getIdentity();
  }
  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }
  noticias(){
    this.router.navigate(['/noticias']);
  }
}

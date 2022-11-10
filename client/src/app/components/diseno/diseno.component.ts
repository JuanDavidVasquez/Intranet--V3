import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from 'src/app/service/global';

@Component({
  selector: 'app-diseno',
  templateUrl: './diseno.component.html',
  styleUrls: ['./diseno.component.css']
})
export class DisenoComponent implements OnInit {

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

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
  }
  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }
}

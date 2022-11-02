import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Aspirante } from 'src/app/models/aspirante';
import { AspiranteService } from 'src/app/service/aspirante.service';
import { GLOBAL } from 'src/app/service/global';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-buscar-aspirante',
  templateUrl: './buscar-aspirante.component.html',
  styleUrls: ['./buscar-aspirante.component.css'],
  providers: [AspiranteService, UserService]
})
export class BuscarAspiranteComponent implements OnInit {

  public aspirantes: Aspirante[];
  public title: string;
  public url: string;
  public user: User;
  public search: string;
  public identity;
  public token;
	public status:string;
	public searchString: string;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _aspirantesService: AspiranteService,
    private _userService:UserService
  ) {
    this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
    this.title = 'Aspirantes encontrados';
    this.url = GLOBAL.url;
    
   }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      var search = params['search'];
      this.search = search;

      this._aspirantesService.searchAspirante(search).subscribe(
        response =>{
            if(response.aspirantes){
              this.aspirantes = response.aspirantes;
            }else{
              this.aspirantes=[];
            }
        },
        error =>{
          console.log(error);
          this.aspirantes=[];
        }
        
      )
    });
  }

}

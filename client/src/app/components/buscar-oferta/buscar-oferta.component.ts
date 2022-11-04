import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OfertaLaboral } from 'src/app/models/ofertaLaboral';
import { OfertaLaboralService } from 'src/app/service/ofertaLaboral.service';
import { GLOBAL } from 'src/app/service/global';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-buscar-oferta',
  templateUrl: './buscar-oferta.component.html',
  styleUrls: ['./buscar-oferta.component.css'],
  providers:[OfertaLaboralService, UserService]
})
export class BuscarOfertaComponent implements OnInit {

  public ofertaLaborals: OfertaLaboral[];
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
  private _ofertaLaboralService: OfertaLaboralService,
  private _userService:UserService
) {
  this.identity = this._userService.getIdentity();
  this.token = this._userService.getToken();
  this.title = 'Ofertas encontradas';
  this.url = GLOBAL.url;
  
 }

 ngOnInit(): void {
  this._route.params.subscribe(params =>{
    var search = params['search'];
    this.search = search;

    this._ofertaLaboralService.searchOferta(search).subscribe(
      response =>{
          if(response.ofertaLaborals){
            this.ofertaLaborals = response.ofertaLaborals;
          }else{
            this.ofertaLaborals=[];
          }
      },
      error =>{
        console.log(error);
        this.ofertaLaborals=[];
      }
    )
  });
}
goSearch(){
  this._router.navigate(['/buscar-oferta', this.searchString]);
  }
}

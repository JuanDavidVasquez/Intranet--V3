import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Aspirante } from '../../models/aspirante';
import { AspiranteService } from 'src/app/service/aspirante.service';
import { GLOBAL } from 'src/app/service/global';
import { UserService } from 'src/app/service/user.service';
declare var $:any;
@Component({
  selector: 'app-register-aspirante',
  templateUrl: './register-aspirante.component.html',
  styleUrls: ['./register-aspirante.component.css'],
  providers: [AspiranteService]
})
export class RegisterAspiranteComponent implements OnInit {

  title: string;
  public aspirante:Aspirante;
  public status!: string;
  public identity;
	public url: string;
	public token;
  public fecha:any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _aspiranteService: AspiranteService,
    private _userService:UserService
  ) { 
    this.title = 'Registro de Aspirantes';
    this.aspirante = new Aspirante("","",""
    ,"","","","","","","","","","","",this.fecha,"","","");
    this.url = GLOBAL.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    console.log(this.token);
    $('body').css('background','url(../../../assets/img/rrhh/fondorrhh.jpg)')
    .css('background-repeat','no-repeat');
    this.fecha = Date();
  }
 
  onSubmit(form:any){
	  this._aspiranteService.saveAspirante(this.aspirante,this.token).subscribe(
      response =>{
        if(response.aspirante){
          this.token = response.token;
          this.status = 'success';
          form.reset();
          this._router.navigate(['/reclutamiento']);
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

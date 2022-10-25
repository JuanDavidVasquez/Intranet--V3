import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Aspirante } from '../../models/aspirante';
import { AspiranteService } from 'src/app/service/aspirante.service';
import { GLOBAL } from 'src/app/service/global';
import { UserService } from 'src/app/service/user.service';

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

  constructor(
    private router:Router,
    private _route: ActivatedRoute,
    private _router: Router,
    private _aspiranteService: AspiranteService,
    private _userService:UserService
  ) { }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
  }
  ngDoCheck(){
  	this.identity = this._userService.getIdentity();
  }

  onSubmit(form:any){
	  this._aspiranteService.saveAspirante(this.aspirante).subscribe(
      response =>{
        if(response.aspirante){
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
}

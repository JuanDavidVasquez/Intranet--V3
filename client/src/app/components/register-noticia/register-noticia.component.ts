import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Noticia } from '../../models/noticia';
import { NoticiaService } from 'src/app/service/noticia.service';
import { GLOBAL } from 'src/app/service/global';
import { UserService } from 'src/app/service/user.service';
declare var $:any;

@Component({
  selector: 'app-register-noticia',
  templateUrl: './register-noticia.component.html',
  styleUrls: ['./register-noticia.component.css'],
  providers: [NoticiaService]
})
export class RegisterNoticiaComponent implements OnInit {
 
  title: string;
  public noticia:Noticia;
  public status!: string;
  public identity;
	public url: string;

  constructor(
    private router:Router,
    private _route: ActivatedRoute,
    private _router: Router,
    private _noticiaService: NoticiaService,
    private _userService:UserService
  ) {
    this.title = 'Registro de Noticia';
    this.noticia = new Noticia("","","","");
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    $('body').css('background','url(../../../assets/img/noticias/fondonoticias.jpg)')
      .css('background-repeat','no-repeat')
      .css('background-size','cover');
  }
  onSubmit(form:any){
	  this._noticiaService.saveNoticia(this.noticia).subscribe(
      response =>{
        if(response.noticia){
          this.status = 'success';
          form.reset();
          this._router.navigate(['/dashboard-noticias']);
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

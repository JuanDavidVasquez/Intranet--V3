import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Noticia } from '../../models/noticia';
import { NoticiaService } from 'src/app/service/noticia.service';


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
	public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _noticiaService: NoticiaService
  ) {
    this.title = 'Registro de Noticia';
    this.noticia = new Noticia("","","","");
   }

  ngOnInit(): void {
  }
  onSubmit(form:any){
	  this._noticiaService.saveNoticia(this.noticia).subscribe(
      response =>{
        if(response.noticia){
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
}

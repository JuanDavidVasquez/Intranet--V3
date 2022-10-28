import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/service/noticia.service';
import { GLOBAL } from 'src/app/service/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-edit-noticia',
  templateUrl: './edit-noticia.component.html',
  styleUrls: ['./edit-noticia.component.css'],
  providers: [NoticiaService]
})
export class EditNoticiaComponent implements OnInit {

  public noticias:Noticia[];
  public url:string;

  constructor(
    private _noticiaService: NoticiaService
  ) { 
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.getNoticias();
    $('body').css('background','url(../../../assets/img/noticias/fondonoticias.jpg)')
      .css('background-repeat','no-repeat')
      .css('background-size','cover');
  }

  getNoticias(){
    this._noticiaService.getNoticias().subscribe(
      response =>{
        if(response.noticias){
          this.noticias = response.noticias;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}

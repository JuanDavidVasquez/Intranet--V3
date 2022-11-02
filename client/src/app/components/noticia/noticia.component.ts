import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from 'src/app/service/global';
declare var $:any;

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Noticia;
  @Output() MarcarFavorita = new EventEmitter;
  public url: string;
  constructor() {
    this.url = GLOBAL.url;
   }

  ngOnInit(): void {
  }
  seleccionar(event: any, noticia: any){
    this.MarcarFavorita.emit({
      noticia: noticia
    });
    $('.row').css('height','27vh')
             .css('display','flex')
             .css('overflow','hidden')
             .css('justify-content','center')
             .css('align-items','center');
  }
}

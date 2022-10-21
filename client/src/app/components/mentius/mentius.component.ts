import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-mentius',
  templateUrl: './mentius.component.html',
  styleUrls: ['./mentius.component.css']
})
export class MentiusComponent implements OnInit {
 
  public menus!:boolean;
 
  constructor(private router:Router) { }


  ngOnInit(): void {
  }
  noticias(){
    this.router.navigate(['/noticias']);
  }
}

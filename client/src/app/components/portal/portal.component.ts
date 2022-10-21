import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  searchs() {
    $("#effect").animate({
      color: "#fff",
      width: 700
    }, 1000);
    $("input").animate({
      display: "block",
      height: "50px",
      backgroundColor:"transparent",
      width:500,
    }, 1000);
    $('input', this).focus();
  }
  portal(){
    this.router.navigate(['/portal-empleo']);
  }
}
